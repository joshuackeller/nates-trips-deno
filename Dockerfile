FROM node

WORKDIR /

RUN curl -fsSL https://deno.land/x/install/install.sh | sh

ENV DENO_INSTALL="/root/.deno"

ENV PATH="${DENO_INSTALL}/bin:${PATH}"

RUN deno --help