FROM node

WORKDIR /

# Install Dependencies
RUN curl -fsSL https://deno.land/x/install/install.sh | sh
ENV DENO_INSTALL="/root/.deno"
ENV PATH="${DENO_INSTALL}/bin:${PATH}"
RUN npm install pm2 -g
RUN git clone https://github.com/joshuackeller/nates-trips-deno.git

# Setup dir
# RUN mkdir -p /nates-trips-deno
# COPY . /nates-trips-deno

# Run
# EXPOSE 4000
# CMD pm2 start main.ts --interpreter="deno" --interpreter-args="run --allow-net" 




