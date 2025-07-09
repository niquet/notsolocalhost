---
title: "Illustrated Guide to Database Stuff"
data: 2025-04-02
layout: post
---

Relating records with joins

- Joins produce values or a set of rows by merging together rows from different related tables
- Use a join _most times_ that you're asked to find data that involves multiple resources
- Aggregations take a set of rows and calculate a single value out of them
- Words like _most_, _average_, _least_ are a sign that you need to use an aggregation
- Table order between `FROM` and `JOIN` _frequently_ makes a difference
- We must give context if column names collide
- Tables can be renamed using the `AS` keyword
- There are a few (different) kind of joins
- Inner Join
    - `JOIN` or `INNER JOIN`
    - Merge rows from two different resources based on a matching condition
    - Whenever two values or rows don't match up, the row is dropped from the overall result set
- Left Outer Join (or Left Join)
    - `LEFT JOIN`
    - Merge rows from two different resources based on a matching condition
    - Keep the "left" side regardless of whether the condition is fulfilled between the two rows from different resources
    - In this case the right side is dropped and replaced with empty values (`NULL`)
    - The left side is called _source table_ and the right side is called _join table_
- Right Outer Join (or Right Join)
    - `RIGHT JOIN`
    - Opposite of the left join
    - Keep the values of the _join table_ regardless of the matching condition
    - Dump any rows from the _source table_ that don't match up
    - Include any rows of the _join table_ even if they have no matching counterpart
- Full Join
    - `FULL JOIN`
    - Combines a left join and a right join
    - Match all the records that you can, fill up the missing values with `NULL` for either side for the remaining rows

Aggregation of records

- Grouping: Reduces many rows down to fewer rows
- Done by using the `GROUP BY` keyword
- Visualizing the result is key to use
- Aggregates: Reduces many values down to one
- Done by using _aggregate functions_
- `GROUP BY` behind the scenes
    - Find the set of all unique values of the column you're grouping by
    - Take each row and assign it to a group (out of the set) based on its value
- Note: you can `SELECT` columns you grouped by, but other columns can only be selected when aggregated
- Common aggregate functions
    - `COUNT()` returns the number of values in a group of values
    - `SUM()` finds the sum of a group of numbers
    - `AVG()` finds the average of a group of numbers
    - `MIN()` returns the minimum value from a group of numbers
    - `MAX()` returns the maximum value from a group of numbers
- Note: `COUNT()` doesn't include NULL values of the column that's being "counted on"
- `HAVING` filters the set of groups based on a given condition
- Note: `WHERE` filters out some number of rows, `HAVING` filters out some number of groups

Recap: SQL keywords

- `FROM` specifies starting set of rows to work with
- `JOIN` merges in data from additional tables
- `WHERE` filters the set of rows
- `GROUP BY` groups rows by a unique set of values
- `HAVING` filters the set of groups

Sorting records

- Retrieve some number of rows from a table (or some other kind of resource) and reorder them based on some value in a column
- `ORDER BY ... ASC` for ascending order based on some ordering rules (`ASC` ascending order is the default order)
- `ORDER BY ... DESC`  for descending order based on some ordering rules
- Multiple ordering rules can be applied (it's possbile to sort by multiple columns)
- `OFFSET` skips the first N number of rows of the result set (N being the specified offset)
- `LIMIT` returns only the first M number of rows of the result set (M being the specified limit)
- When making use of `LIMIT` and `OFFSET` together, `LIMIT` is placed before `OFFSET` in a query by convention

Unions and intersections with sets

- Set operators: Keywords that are joining together two different sets of data
- `UNION` joins together the results of two queries _and removes duplicate rows_
- If `UNION` "sees" an identical row in two sets, it outputs it only one time
- Use the keyword `UNION ALL` to keep duplicates in the result set
- `UNION ALL` joins together results of two queries
- Note: `UNION` can only be used between results of two queries that have the same columns (name _and_ type)
- `INTERSECT` finds the rows common in the results of two queries _and removes duplicates_
- `INTERSECT ALL` finds the rows common in the results of two queries
- `EXCEPT` finds the rows that are present in the first query but _not_ the second query _and removes duplicates_
- `EXCEPT ALL` finds the rows that are present in the first query but _not_ the second query
- Note: Changing the query order when using `EXCEPT` also changes the result set!

Assembling queries with subqueries

- A set of parentheses around a query creates a subquery
- No semicolon (`;`) at the end of a subquery
- Subqueries can be used as
    - a source of a value, e.g., `(SELECT COUNT(name) FROM products)`
    - a source of rows, e.g., `(SELECT * FROM products)`
    - a source of a column, e.g., `(SELECT id FROM products)`
- I.e. there are multiple types/shapes of data that can be returned by subqueries
- Understanding the _shape_ of a query result is important
    - `SELECT * FROM orders` returns many rows, many columns
    - `SELECT id FROM orders` returns many rows, one column
    - `SELECT COUNT(*) FROM orders` returns one row, one column (single value); also called _scalar query_
- If you want to include a subquery into a `SELECT` statement, the subquery _must_ result in a _single value_

    ```sql
    SELECT name, price, [SUBQUERY]
    FROM products
    WHERE price > 10000;
    ```

- `[SUBQUERY]` could be `(SELECT MAX(price) FROM poducts)` for example
- Any subquery placed inside of a `FROM` clause has to be compatible with the `SELECT`s, `WHERE`s, etc. of the outer query
- Additionally, such a subquery must have an alias applied to it

    ```sql
    SELECT name,
           price_weight_ratio
    FROM [SUBQUERY]
    WHERE price_weight_ratio > 5;
    ```

- `[SUBQUERY]` could be `(SELECT name, price / weight AS price_weight_ratio FROM poducts)` for example
- 

## Credits

[1] S. Grider, *SQL and PostgreSQL: The Complete Developer's Guide*, Udemy, 2024. [Online]. Available: [https://www.udemy.com/course/sql-and-postgresql/](https://www.udemy.com/course/sql-and-postgresql/). [Accessed: 02-Apr-2025].
