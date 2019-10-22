SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;


DROP TABLE IF EXISTS article_list;


CREATE TABLE article_list (
    article_name 
    category_id smallint NOT NULL,
    category_name character varying(15) NOT NULL,
    description text,
);