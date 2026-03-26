FROM wordpress:6-php8.1-apache

# Install Redis PHP extension
RUN pecl install redis && docker-php-ext-enable redis

# Install additional useful extensions
RUN docker-php-ext-install opcache

# Configure opcache
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.memory_consumption=128" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.max_accelerated_files=4000" >> /usr/local/etc/php/conf.d/opcache.ini