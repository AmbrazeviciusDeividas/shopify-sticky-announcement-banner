FROM php:8.1-fpm-alpine

# Install necessary libraries and extensions
RUN apk update && apk add --no-cache \
    postgresql-dev \
    libpq \
    nodejs npm \
    composer \
    php-pdo_sqlite \
    php-pdo_mysql \
    php-pdo_pgsql \
    php-simplexml \
    php-fileinfo \
    php-dom \
    php-tokenizer \
    php-xml \
    php-xmlwriter \
    php-session \
    openrc bash nginx

# Install pdo_pgsql extension
RUN docker-php-ext-install pdo_pgsql

# Add API keys and App settings as arguments
ARG SHOPIFY_API_KEY
ENV SHOPIFY_API_KEY=$SHOPIFY_API_KEY


# Copy the application files to the container
COPY --chown=www-data:www-data web /app
WORKDIR /app

# Overwrite default nginx config
COPY web/nginx.conf /etc/nginx/nginx.conf

# Use the default production configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

RUN composer install
RUN touch /app/storage/db.sqlite
RUN chown www-data:www-data /app/storage/db.sqlite

RUN cd frontend && npm install && npm run build
RUN composer build

ENTRYPOINT [ "/app/entrypoint.sh" ]
