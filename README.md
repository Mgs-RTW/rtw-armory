## rtw-armory

A tool for the game Lord of the rings: Rise to war

## handy scripts

### postgres

Create a copy of production data to import locally ( delete your races first if you want to run it )

```sh
pg_dump -a  --data-only  --username avnadmin -p 10143 -h rtw-armory-rtw-armory.a.aivencloud.com -C --column-inserts --exclude-table=public.migration  --exclude-table=public.session defaultdb > rtw-armory-backup-production.sql
```
