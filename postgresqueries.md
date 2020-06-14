
-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    "firstName" "char"[],
    "lastName" "char"[],
    email "char"[],
    secret "char"[],
    "deletedAt" date,
    id integer NOT NULL,
    "createdAt" date,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;



///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//Foreigh key



-- Table: public.friendships

-- DROP TABLE public.friendships;

CREATE TABLE public.friendships
(
    id serial NOT NULL,
    user1 serial NOT NULL,
    user2 serial NOT NULL,
    CONSTRAINT "Friendships_pkey" PRIMARY KEY (id),
    CONSTRAINT fk_user1 FOREIGN KEY (user1)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_user2 FOREIGN KEY (user2)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.friendships
    OWNER to postgres;


