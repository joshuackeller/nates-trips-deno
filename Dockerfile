FROM denoland/deno

WORKDIR /

# Install Dependencies
RUN git clone https://github.com/joshuackeller/nates-trips-deno.git

# Run
EXPOSE 4000
CMD ["deno", "run", "--allow-net", "/nates-trips-deno/main.ts"]
