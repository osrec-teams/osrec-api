export NODE_ENV=test
export PORT=8181

if ! psql -lqt -h localhost | cut -d \| -f 1 | grep -qw osrec-test; then
  psql -h localhost postgres -c 'CREATE DATABASE "osrec-test"';
fi

jest -i $@

psql -h localhost postgres -c 'DROP DATABASE "osrec-test"'
