# sanari

index    >> GET      >>  /
store    >> POST     >>  /
edit     >> PUT      >>  /
change   >> PATCH    >>  /
remove   >> DELETE   >>  /
show     >> GET      >>  /:id
create   >> POST     >>  /:id
update   >> PUT      >>  /:id
alter    >> PATCH    >>  /:id
destroy  >> DELETE   >>  /:id

<https://github.com/adnan-kamili/swagger-response-template>

## Parameter

  [Filter Data]
    - Quick Search  >> ?s=value
    - Equal         >> ?where=column1:value1|column2:value2
    - Like          >> ?like=column1:value1|column2:value2
    - Between       >> ?between=column1:start1,end2
    - In            >> ?in=column1:value1,value2,value3
    - Select        >> ?select=column1,column2,column:sub_column

  [Order Data]
    - Ascending     >> ?order=column1:asc|column2:asc
    - Descending    >> ?order=column1:desc|column2:desc
    - Group         >> ?order=column1:asc|column2:desc

  [Etc Filter]
    - Deleted       >> ?trash=true
    - +Deleted      >> ?all=true
    - Limit         >> ?limit=10
