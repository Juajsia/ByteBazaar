-- View: public.BestSellers

-- DROP VIEW public."BestSellers";

CREATE OR REPLACE VIEW public."BestSellers"
 AS
 SELECT count(od."ProductId") AS ordersnum,
    od."ProductId",
    p.name,
    p.description,
    p.image,
    p.price,
    p.provider,
    p.specs,
    p.status,
    p.stock
   FROM "OrderDetails" od
     JOIN "Products" p ON od."ProductId" = p.id
  GROUP BY od."ProductId", p.name, p.description, p.image, p.price, p.provider, p.specs, p.status, p.stock
  ORDER BY (count(od."ProductId")) DESC;

ALTER TABLE public."BestSellers"
    OWNER TO "ByteBazaar";
   
-- View: public.yearlyOrders

-- DROP VIEW public."yearlyOrders";

CREATE OR REPLACE VIEW public."yearlyOrders"
 AS
 WITH date_limits AS (
         SELECT now() - '13 years'::interval AS leftlimit,
            now() AS rightlimit
        )
 SELECT EXTRACT(year FROM year::date)::character varying AS name,
    yearly_sales AS value
   FROM ( SELECT date_trunc('year'::text, "Orders"."createdAt") AS year,
            count("Orders".id) AS yearly_orders,
            trunc(sum("Orders".total)::numeric, 2) AS yearly_sales
           FROM "Orders",
            date_limits
          WHERE "Orders"."createdAt" >= date_limits.leftlimit AND "Orders"."createdAt" <= date_limits.rightlimit
          GROUP BY (date_trunc('year'::text, "Orders"."createdAt"))
          ORDER BY (date_trunc('year'::text, "Orders"."createdAt"))) unnamed_subquery;

ALTER TABLE public."yearlyOrders"
    OWNER TO "ByteBazaar";


-- View: public.monthlyOrders

-- DROP VIEW public."monthlyOrders";

CREATE OR REPLACE VIEW public."monthlyOrders"
 AS
 WITH date_limits AS (
         SELECT now() - '1 year'::interval AS leftlimit,
            now() AS rightlimit
        )
 SELECT (EXTRACT(year FROM date_trunc('month'::text, "Orders"."createdAt"))::character varying::text || '-'::text) || EXTRACT(month FROM date_trunc('month'::text, "Orders"."createdAt"))::character varying::text AS name,
    trunc(sum("Orders".total)::numeric, 2) AS value
   FROM "Orders",
    date_limits
  WHERE "Orders"."createdAt" >= date_limits.leftlimit AND "Orders"."createdAt" <= date_limits.rightlimit
  GROUP BY (date_trunc('month'::text, "Orders"."createdAt"))
  ORDER BY (date_trunc('month'::text, "Orders"."createdAt"));

ALTER TABLE public."monthlyOrders"
    OWNER TO "ByteBazaar";


-- View: public.dailyOrders

-- DROP VIEW public."dailyOrders";

CREATE OR REPLACE VIEW public."dailyOrders"
 AS
 WITH date_limits AS (
         SELECT now() - '13 days'::interval AS leftlimit,
            now() AS rightlimit
        )
 SELECT (EXTRACT(month FROM truncated_day)::text || '-'::text) || (EXTRACT(day FROM truncated_day)::text || 'st'::text) AS name,
    daily_sales AS value
   FROM ( SELECT date_trunc('day'::text, "Orders"."createdAt") AS truncated_day,
            trunc(sum("Orders".total)::numeric, 2) AS daily_sales
           FROM "Orders",
            date_limits
          WHERE "Orders"."createdAt" >= date_limits.leftlimit AND "Orders"."createdAt" <= date_limits.rightlimit
          GROUP BY (date_trunc('day'::text, "Orders"."createdAt"))
          ORDER BY (date_trunc('day'::text, "Orders"."createdAt"))) subquery;

ALTER TABLE public."dailyOrders"
    OWNER TO "ByteBazaar";


-- View: public.hourlyOrders

-- DROP VIEW public."hourlyOrders";

CREATE OR REPLACE VIEW public."hourlyOrders"
 AS
 WITH date_limits AS (
         SELECT now() - '13:00:00'::interval AS leftlimit,
            now() AS rightlimit
        )
 SELECT (EXTRACT(day FROM truncated_hour)::text || 'st - '::text) || (lpad(EXTRACT(hour FROM truncated_hour)::text, 2, '0'::text) || ':00'::text) AS name,
    hourly_sales AS value
   FROM ( SELECT date_trunc('hour'::text, "Orders"."createdAt") AS truncated_hour,
            trunc(sum("Orders".total)::numeric, 2) AS hourly_sales
           FROM "Orders",
            date_limits
          WHERE "Orders"."createdAt" >= date_limits.leftlimit AND "Orders"."createdAt" <= date_limits.rightlimit
          GROUP BY (date_trunc('hour'::text, "Orders"."createdAt"))
          ORDER BY (date_trunc('hour'::text, "Orders"."createdAt"))) subquery;

ALTER TABLE public."hourlyOrders"
    OWNER TO "ByteBazaar";

-- View: public.NumProductsByCategory

-- DROP VIEW public."NumProductsByCategory";

CREATE OR REPLACE VIEW public."NumProductsByCategory"
 AS
 SELECT c.name,
    count(pc."ProductId") AS value
   FROM "ProductCategories" pc
     JOIN "Categories" c ON c.id = pc."CategoryId"
  WHERE c.id > 3
  GROUP BY c.name
  ORDER BY value DESC;

ALTER TABLE public."NumProductsByCategory"
    OWNER TO "ByteBazaar";

-- View: public.registeredUsers

-- DROP VIEW public."registeredUsers";

CREATE OR REPLACE VIEW public."registeredUsers"
 AS
 WITH active_clients AS (
         SELECT 'Active Clients'::text AS name,
            count(subquery.clientid) AS value
           FROM ( SELECT o."clientId" AS clientid
                   FROM "Clients" c
                     JOIN "Orders" o ON c."personId" = o."clientId"
                  GROUP BY o."clientId") subquery
        ), inactive_clients AS (
         SELECT 'Inactive Clients'::text AS name,
            (( SELECT count("Clients"."personId") AS count
                   FROM "Clients")) - (( SELECT active_clients.value
                   FROM active_clients)) AS value
        ), administrators AS (
         SELECT 'Administrators'::text AS name,
            count("Administrators"."personId") AS value
           FROM "Administrators"
        ), sales_agents AS (
         SELECT 'Sales Agents'::text AS name,
            count("SalesAgents"."personId") AS value
           FROM "SalesAgents"
        )
 SELECT active_clients.name,
    active_clients.value
   FROM active_clients
UNION ALL
 SELECT inactive_clients.name,
    inactive_clients.value
   FROM inactive_clients
UNION ALL
 SELECT administrators.name,
    administrators.value
   FROM administrators
UNION ALL
 SELECT sales_agents.name,
    sales_agents.value
   FROM sales_agents;

ALTER TABLE public."registeredUsers"
    OWNER TO "ByteBazaar";







