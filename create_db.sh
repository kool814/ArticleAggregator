dropdb --if-exists article_aggregator
dropuser --if-exists article_aggregator_user

createdb article_aggregator
psql article_aggregator < article_aggregator.sql

psql --no-psqlrc template1 -c "create user article_aggregator_user;"
psql --no-psqlrc template1 -c "alter user article_aggregator_user password 'article_agg';"
psql --no-psqlrc template1 -c "grant all on DATABASE article_aggregator to article_aggregator_user;"
psql --no-psqlrc article_aggregator -c "GRANT ALL on ALL tables IN SCHEMA public to article_aggregator_user"