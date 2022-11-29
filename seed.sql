create table if not exists _prisma_migrations
(
    id                  varchar(36)                            not null
        primary key,
    checksum            varchar(64)                            not null,
    finished_at         timestamp with time zone,
    migration_name      varchar(255)                           not null,
    logs                text,
    rolled_back_at      timestamp with time zone,
    started_at          timestamp with time zone default now() not null,
    applied_steps_count integer                  default 0     not null
);


create table if not exists users
(
    id         serial
        primary key,
    email      varchar(200)                      not null,
    password   varchar(300)                      not null,
    is_active  boolean default true,
    created_at date    default CURRENT_TIMESTAMP not null,
    status     boolean default true              not null,
    deleted_at date,
    updated_at date    default CURRENT_TIMESTAMP
);


create table if not exists patients
(
    id                   serial
        primary key,
    full_name            varchar(200)                      not null,
    email                varchar(200)                      not null,
    phone                varchar(30)                       not null,
    address              varchar(300),
    date_of_birth        varchar(10),
    is_special_attention boolean default false,
    added_by             integer
        references users,
    created_at           date    default CURRENT_TIMESTAMP not null,
    updated              date    default CURRENT_TIMESTAMP not null,
    status               boolean default true              not null,
    deleted_at           date,
    avatar_filename      varchar(500),
    allergies            text[]
);


create table if not exists allergies
(
    id                             serial
        primary key,
    patient_id                     integer
        references patients,
    allergy_remarks                text,
    allergy_since                  date,
    allergy_medications_used       varchar(300),
    allergy_medications_prescribed text,
    consultant_name                varchar(300)
);


create table if not exists patient_photos
(
    id         serial
        primary key,
    patient_id integer
        references patients,
    image_url  varchar(500)
);


create unique index if not exists uq_patient_photos
    on patient_photos (patient_id);

create unique index if not exists uq_patients
    on patients (email, phone);

create table if not exists user_logs
(
    id       serial
        primary key,
    user_id  integer
        references users,
    remarks  varchar(300),
    datetime timestamp(6) default CURRENT_TIMESTAMP
);


create table if not exists user_tokens
(
    id       serial
        primary key,
    user_id  integer
        references users,
    token    varchar(8) not null,
    is_valid boolean default true
);


create unique index if not exists uq_user_tokens
    on user_tokens (user_id, token);

