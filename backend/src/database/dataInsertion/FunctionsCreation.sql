-- FUNCTION: public.get_review_scores(integer)

-- DROP FUNCTION IF EXISTS public.get_review_scores(integer);

CREATE OR REPLACE FUNCTION public.get_review_scores(
	product_id integer)
    RETURNS TABLE(name integer, value integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT score AS name, 
           count(score)::INTEGER AS value
    FROM public."Reviews"
    WHERE "ProductId" = product_id
    GROUP BY score;
END;
$BODY$;

ALTER FUNCTION public.get_review_scores(integer)
    OWNER TO "ByteBazaar";
