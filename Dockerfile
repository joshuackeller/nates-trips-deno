FROM node

WORKDIR /nates-trips-deno

# Install Dependencies
RUN curl -fsSL https://deno.land/x/install/install.sh | sh
ENV DENO_INSTALL="/root/.deno"
ENV PATH="${DENO_INSTALL}/bin:${PATH}"
RUN npm install pm2 -g

# Setup dir
RUN mkdir /nates-trips-deno
COPY . /nates-trips-deno

# Run server
EXPOSE 4000
CMD pm2 start main.ts --interpreter="deno" --interpreter-args="run --allow-net" 




