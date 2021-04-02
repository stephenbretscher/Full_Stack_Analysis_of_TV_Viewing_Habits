CREATE TABLE "sunburst_data" (
    "index" int   NOT NULL,
    "id" VARCHAR   NOT NULL,
    "label" VARCHAR ,
    "parents" VARCHAR,
    "values" INT,
    CONSTRAINT "pk_Customer" PRIMARY KEY (
        "index"
     )
);


