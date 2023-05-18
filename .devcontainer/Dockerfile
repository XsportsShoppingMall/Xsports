FROM php:7.4-apache
COPY src/ /var/www/html/
RUN chown -R www-data:www-data /var/www/html && a2enmod rewrite

# Update the default apache site with the config we created.
ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf

EXPOSE 80