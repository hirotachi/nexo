<?php

namespace App\models;


use App\core\VerificationException;
use PDO;
use PDOException;

abstract class Model
{
	static public PDO $pdo;
	protected PDO $connection;
	protected array $required = [];
	protected array $defaults = [];
	protected bool $withTimestamps = true; // indicate whether table has createdAt and updatedAt fields to update them
	protected string $driver = "mysql";
	protected string $table;

	public function __construct()
	{
		extract(get_object_vars(config()->db));
		try {
			$this->connection = new PDO("$this->driver:dbname=$database;host=$host:$port", $username, $password);
			self::$pdo = $this->connection;
		} catch (PDOException $e) {
			die("Database connection error: ".$e->getMessage());
		}
	}

	/**
	 * @throws VerificationException
	 */
	public function create($data): bool|object
	{
		$data = [...$this->getDefaults(), ...$data];

		$notFilledFields = $this->verifyRequired($data);
		if ($notFilledFields) {
			throw new VerificationException(message: "required fields not filled", fields: $notFilledFields);
		}

		$placeholders = implode(",", $this->getNamedPlaceholders($data));
		$columns = implode(",", array_keys($data));
		$statement = $this->connection->prepare("insert into $this->table ($columns) values ($placeholders)");
		return !$statement->execute($data) ? false : $this->findByID($this->connection->lastInsertId());
	}

	public function updateByID($id, $updates): bool
	{
		return $this->update("id = :id", $updates, ["id" => $id]);
	}

	public function update($filter, $updates, $placeholderValues = []): bool
	{
		if ($this->withTimestamps) {
			$updates["updatedAt"] = date('Y-m-d H:i:s');
		}
		$updateColumnsString = implode(",", $this->getUpdateColumnsString($updates));
		$f = $this->connection->prepare("update $this->table set $updateColumnsString where $filter");
		return $f->execute([...$updates, ...$placeholderValues]);
	}

	public function deleteByID($id): bool
	{
		return $this->delete("id = :id", ["id" => $id]);
	}

	public function delete($filter, $placeholderValues = []): bool
	{
		$f = $this->connection->prepare("delete from $this->table where $filter");
		return $f->execute($placeholderValues);
	}

	public function findByID($id)
	{
		return $this->findOne("id = :id", ["id" => $id]);
	}

	public function findOne($filter, $placeholderValues = [])
	{
		$st = $this->connection->prepare("select * from $this->table where $filter");
		$st->execute($placeholderValues);
		return $st->fetch(PDO::FETCH_OBJ);
	}

	public function findOneIn(string $field, array $values)
	{
		$placeholders = implode(",", array_fill(0, count($values), "?"));
		return $this->findOne("$field in ($placeholders)", $values);
	}

	public function findAllIn(string $field, array $values, int $limit = null, int $offset = null): bool|array
	{
		$placeholders = implode(", ", array_fill(0, count($values), "?"));
		return $this->findAll("where $field in ($placeholders)", $values, limit: $limit, offset: $offset);
	}

	public function deleteIn(string $field, array $values): bool
	{
		$placeholders = implode(",", array_fill(0, count($values), "?"));
		return $this->delete("$field in ($placeholders)", $values);
	}

	public function createMany(array $data): bool
	{
		if (count($data) == 0) {
			return false;
		}
		$data = array_map(function ($item) {
			return [...$this->getDefaults(), ...$item];
		}, $data);
		$placeholders = implode(",", array_map(function ($item) {
			return "(".implode(",", $this->getPlaceholders($item)).")";
		}, $data));
		$columns = implode(",", array_keys($data[0]));
		$statement = $this->connection->prepare("insert into $this->table ($columns) values $placeholders");
		$values = array_reduce($data, function ($carry, $item) {
			return array_merge($carry, array_values($item));
		}, []);
		return !$statement->execute($values);
	}

	public function deleteManyByField(string $field, array $values): bool
	{
		$placeholders = implode(",", $this->getPlaceholders($values));
		return $this->delete("$field in ($placeholders)", $values);
	}

	public function findAll(
		$filter = "",
		$placeholderValues = [],
		$orderBy = "id desc",
		int $limit = null,
		int $offset = null
	): bool|array {
		$query = ["select * from $this->table $filter"];
		if ($orderBy) {
			$query[] = "order by $this->table.$orderBy";
		}
		if ($limit) {
			$query[] = " limit $limit";
		}
		if ($limit && $offset) {
			$query[] = " offset $offset";
		}


		$query = implode(" ", $query);
		$f = $this->connection->prepare($query);
		return !$f->execute($placeholderValues) ? false : $f->fetchAll(PDO::FETCH_OBJ);
	}

	public function count(string $filter = "", array $placeholderValues = [])
	{
		$f = $this->connection->prepare("select count(*) from $this->table $filter");
		$f->execute($placeholderValues);
		return $f->fetchColumn();
	}

	protected function getDefaults(): array
	{
		return array_map(function ($default) {
			return is_callable($default) ? $default() : $default;
		}, $this->defaults);
	}

	public function verifyRequired($data): bool|array
	{
		return verifyArrayKeys($this->required, $data);
	}

	protected function getNamedPlaceholders($data): array
	{
		return array_map(function ($v) {
			return ":$v";
		}, array_keys($data));
	}

	protected function getPlaceholders($data): array
	{
		return array_fill(0, count($data), "?");
	}

	protected function getUpdateColumnsString($data): array
	{
		return array_map(function ($key) {
			return "$key = :$key";
		}, array_keys($data));
	}

}