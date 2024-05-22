-- PROCEDURE: public.get_avg_num_orders_per_client(character varying)

-- DROP PROCEDURE IF EXISTS public.get_avg_num_orders_per_client(character varying);

CREATE OR REPLACE PROCEDURE public.get_avg_num_orders_per_client(
	OUT avg_num_orders_per_client numeric,
	IN interval_val character varying)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    leftLimit TIMESTAMP;
    rightLimit TIMESTAMP;
BEGIN
    -- Calculate leftLimit using the interval_val
    leftLimit := now() - CAST(interval_val AS INTERVAL);
    rightLimit := now();

    RAISE NOTICE 'The value of leftLimit is: %', leftLimit;
    RAISE NOTICE 'The value of rightLimit is: %', rightLimit;

	select round(avg(num_orders_per_client)) into avg_num_orders_per_client 
	from (SELECT "clientId", count(id) as num_orders_per_client
		  FROM public."Orders"
		  WHERE "createdAt" BETWEEN leftLimit AND rightLimit
		  group by "clientId");

    -- Output the result
    RAISE NOTICE 'The average order value is: %', avg_num_orders_per_client;
END;
$BODY$;
ALTER PROCEDURE public.get_avg_num_orders_per_client(character varying)
    OWNER TO "ByteBazaar";

-- PROCEDURE: public.get_avg_num_products_per_order(character varying)

-- DROP PROCEDURE IF EXISTS public.get_avg_num_products_per_order(character varying);

CREATE OR REPLACE PROCEDURE public.get_avg_num_products_per_order(
	OUT avg_num_products_per_order numeric,
	IN interval_val character varying)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    leftLimit TIMESTAMP;
    rightLimit TIMESTAMP;
BEGIN
    -- Calculate leftLimit using the interval_val
    leftLimit := now() - CAST(interval_val AS INTERVAL);
    rightLimit := now();

    RAISE NOTICE 'The value of leftLimit is: %', leftLimit;
    RAISE NOTICE 'The value of rightLimit is: %', rightLimit;

	select round(avg(num_products_per_order)) into avg_num_products_per_order 
	from (SELECT "OrderId", count("OrderId") num_products_per_order
		  FROM public."OrderDetails"
		  WHERE "createdAt" BETWEEN leftLimit AND rightLimit
		  group by "OrderId");

    -- Output the result
    RAISE NOTICE 'The average order value is: %', avg_num_products_per_order;
END;
$BODY$;
ALTER PROCEDURE public.get_avg_num_products_per_order(character varying)
    OWNER TO "ByteBazaar";

-- PROCEDURE: public.get_avg_order_value(character varying)

-- DROP PROCEDURE IF EXISTS public.get_avg_order_value(character varying);

CREATE OR REPLACE PROCEDURE public.get_avg_order_value(
	OUT avg_order_value numeric,
	IN interval_val character varying)
LANGUAGE 'plpgsql'
AS $BODY$
DECLARE
    leftLimit TIMESTAMP;
    rightLimit TIMESTAMP;
BEGIN
    -- Calculate leftLimit using the interval_val
    leftLimit := now() - CAST(interval_val AS INTERVAL);
    rightLimit := now();

    RAISE NOTICE 'The value of leftLimit is: %', leftLimit;
    RAISE NOTICE 'The value of rightLimit is: %', rightLimit;

    -- Store the result of the query in the avg_order_value variable
    SELECT trunc(avg(total)::numeric, 2) INTO avg_order_value
    FROM public."Orders"
    WHERE "createdAt" BETWEEN leftLimit AND rightLimit;

    -- Output the result
    RAISE NOTICE 'The average order value is: %', avg_order_value;
END;
$BODY$;
ALTER PROCEDURE public.get_avg_order_value(character varying)
    OWNER TO "ByteBazaar";
