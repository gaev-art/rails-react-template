# Deployment Guide

## Overview

This guide covers deployment strategies for the React Starter Kit, including Docker containerization, environment configuration, and production best practices.

## Deployment Options

### 1. Docker Deployment (Recommended)
### 2. Traditional Server Deployment
### 3. Cloud Platform Deployment
### 4. SSR Deployment

---

## Docker Deployment

### Standard Docker Build

#### Build Production Image
```bash
# Build the Docker image
docker build -t react-starter-kit .

# Check image size
docker images react-starter-kit
```

#### Run Container
```bash
# Basic run
docker run -d -p 80:80 \
  -e RAILS_MASTER_KEY=your_master_key_here \
  --name react-starter-kit \
  react-starter-kit

# With environment file
docker run -d -p 80:80 \
  --env-file .env.production \
  --name react-starter-kit \
  react-starter-kit

# With volume for logs
docker run -d -p 80:80 \
  -e RAILS_MASTER_KEY=your_master_key_here \
  -v /host/logs:/rails/log \
  --name react-starter-kit \
  react-starter-kit
```

### SSR Docker Build

For Server-Side Rendering support:

```bash
# Build SSR-enabled image
docker build -f Dockerfile-ssr -t react-starter-kit:ssr .

# Run SSR container
docker run -d -p 80:80 \
  -e RAILS_MASTER_KEY=your_master_key_here \
  --name react-starter-kit-ssr \
  react-starter-kit:ssr
```

### Docker Compose

Create `docker-compose.yml` for easier deployment:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    environment:
      - RAILS_ENV=production
      - RAILS_MASTER_KEY=${RAILS_MASTER_KEY}
    volumes:
      - ./log:/rails/log
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/up"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Optional: Add database service
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=react_starter_kit_production
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

Run with Docker Compose:
```bash
# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f web

# Stop services
docker-compose down
```

---

## Environment Configuration

### Environment Variables

#### Required Variables
```bash
# Rails configuration
RAILS_ENV=production
RAILS_MASTER_KEY=your_64_character_master_key

# Optional but recommended
SECRET_KEY_BASE=your_secret_key_base
RAILS_LOG_LEVEL=info
```

#### Database Configuration
```bash
# PostgreSQL example
DATABASE_URL=postgresql://username:password@host:5432/database_name

# MySQL example
DATABASE_URL=mysql2://username:password@host:3306/database_name
```

#### Redis Configuration (if using)
```bash
REDIS_URL=redis://localhost:6379/0
```

### Environment Files

Create environment-specific files:

#### `.env.production`
```bash
RAILS_ENV=production
RAILS_LOG_LEVEL=info
SECRET_KEY_BASE=your_production_secret_key_base
DATABASE_URL=postgresql://user:pass@db:5432/react_starter_kit_production
```

#### `.env.staging`
```bash
RAILS_ENV=staging
RAILS_LOG_LEVEL=debug
SECRET_KEY_BASE=your_staging_secret_key_base
DATABASE_URL=postgresql://user:pass@staging-db:5432/react_starter_kit_staging
```

### Rails Credentials

Generate and manage encrypted credentials:

```bash
# Generate master key (do this once)
EDITOR=vim rails credentials:edit

# For specific environments
EDITOR=vim rails credentials:edit --environment=production
EDITOR=vim rails credentials:edit --environment=staging
```

Example credentials structure:
```yaml
# config/credentials/production.yml.enc
secret_key_base: your_production_secret_key_base
database:
  username: prod_user
  password: secure_password
redis:
  url: redis://production-redis:6379/0
external_services:
  api_key: your_api_key
  webhook_secret: your_webhook_secret
```

---

## Cloud Platform Deployment

### Heroku Deployment

#### Prepare for Heroku
```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set RAILS_MASTER_KEY=your_master_key

# Add buildpacks
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/ruby
```

#### Deploy to Heroku
```bash
# Deploy
git push heroku main

# Run database migrations
heroku run rails db:migrate

# Check status
heroku ps
heroku logs --tail
```

### AWS ECS Deployment

#### Create ECS Task Definition
```json
{
  "family": "react-starter-kit",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "web",
      "image": "your-account.dkr.ecr.region.amazonaws.com/react-starter-kit:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "RAILS_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "RAILS_MASTER_KEY",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:rails-master-key"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/react-starter-kit",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

#### Deploy with ECS CLI
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com

docker build -t react-starter-kit .
docker tag react-starter-kit:latest your-account.dkr.ecr.us-east-1.amazonaws.com/react-starter-kit:latest
docker push your-account.dkr.ecr.us-east-1.amazonaws.com/react-starter-kit:latest

# Create and run service
aws ecs create-service --cluster your-cluster --service-name react-starter-kit --task-definition react-starter-kit --desired-count 2
```

### Google Cloud Run

#### Deploy to Cloud Run
```bash
# Build and push to Google Container Registry
gcloud auth configure-docker

docker build -t gcr.io/your-project-id/react-starter-kit .
docker push gcr.io/your-project-id/react-starter-kit

# Deploy to Cloud Run
gcloud run deploy react-starter-kit \
  --image gcr.io/your-project-id/react-starter-kit \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars RAILS_ENV=production \
  --set-env-vars RAILS_MASTER_KEY=your_master_key
```

---

## Traditional Server Deployment

### VPS/Dedicated Server Setup

#### Prerequisites
```bash
# Install Ruby
rbenv install 3.4.5
rbenv global 3.4.5

# Install Node.js
nvm install 22.18.0
nvm use 22.18.0

# Install dependencies
gem install bundler
npm install -g pm2
```

#### Application Setup
```bash
# Clone and setup
git clone your-repo.git /var/www/react-starter-kit
cd /var/www/react-starter-kit

# Install dependencies
bundle install --deployment --without development test
npm ci --production

# Setup environment
cp .env.example .env.production
# Edit .env.production with production values

# Precompile assets
RAILS_ENV=production bundle exec rails assets:precompile

# Setup database
RAILS_ENV=production bundle exec rails db:create db:migrate
```

#### Process Management with PM2
```bash
# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'react-starter-kit',
    cwd: '/var/www/react-starter-kit',
    script: 'bundle',
    args: 'exec puma -C config/puma.rb',
    env: {
      RAILS_ENV: 'production',
      PORT: 3000
    },
    instances: 2,
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    error_file: './log/pm2-error.log',
    out_file: './log/pm2-out.log',
    log_file: './log/pm2-combined.log',
    time: true
  }]
}
EOF

# Start application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Nginx Configuration
```nginx
upstream react_starter_kit {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL configuration
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/private.key;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Static assets
    location /assets/ {
        root /var/www/react-starter-kit/public;
        expires 1y;
        add_header Cache-Control public;
        add_header ETag "";
        break;
    }

    # Application
    location / {
        proxy_pass http://react_starter_kit;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }

    # Health check
    location /up {
        proxy_pass http://react_starter_kit;
        access_log off;
    }
}
```

---

## Database Setup

### PostgreSQL Setup

#### Installation and Configuration
```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create user and database
sudo -u postgres createuser -P react_starter_kit
sudo -u postgres createdb -O react_starter_kit react_starter_kit_production

# Update database.yml or use DATABASE_URL
DATABASE_URL=postgresql://react_starter_kit:password@localhost/react_starter_kit_production
```

#### Database Migrations
```bash
# Run migrations
RAILS_ENV=production bundle exec rails db:migrate

# Seed data (if applicable)
RAILS_ENV=production bundle exec rails db:seed
```

### MySQL Setup

#### Installation and Configuration
```bash
# Install MySQL
sudo apt-get install mysql-server

# Create user and database
mysql -u root -p
CREATE DATABASE react_starter_kit_production;
CREATE USER 'react_starter_kit'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON react_starter_kit_production.* TO 'react_starter_kit'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Configure connection
DATABASE_URL=mysql2://react_starter_kit:secure_password@localhost/react_starter_kit_production
```

---

## Monitoring and Logging

### Application Monitoring

#### Health Checks
```bash
# Built-in Rails health check
curl http://your-domain.com/up

# Custom health check script
#!/bin/bash
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/up)
if [ $HTTP_CODE -eq 200 ]; then
    echo "Application is healthy"
    exit 0
else
    echo "Application is unhealthy (HTTP $HTTP_CODE)"
    exit 1
fi
```

#### Log Management
```bash
# Centralized logging with rsyslog
echo "*.* @@your-log-server:514" >> /etc/rsyslog.conf
systemctl restart rsyslog

# Log rotation
cat > /etc/logrotate.d/react-starter-kit << EOF
/var/www/react-starter-kit/log/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 0644 deploy deploy
    postrotate
        systemctl reload react-starter-kit
    endscript
}
EOF
```

### Performance Monitoring

#### Application Performance Monitoring
```ruby
# Add to Gemfile
gem 'newrelic_rpm'
gem 'scout_apm'

# Configure in config/newrelic.yml
# Configure in config/scout_apm.yml
```

#### System Monitoring
```bash
# Install monitoring tools
sudo apt-get install htop iotop nethogs

# Process monitoring
ps aux | grep puma
htop

# Memory usage
free -h
cat /proc/meminfo

# Disk usage
df -h
du -sh /var/www/react-starter-kit

# Network monitoring
netstat -tulpn
ss -tulpn
```

---

## SSL/TLS Configuration

### Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Manual SSL Certificate

```bash
# Generate private key
openssl genrsa -out private.key 2048

# Generate certificate signing request
openssl req -new -key private.key -out certificate.csr

# Install certificate files in Nginx configuration
# Update ssl_certificate and ssl_certificate_key paths
```

---

## Backup Strategy

### Database Backups

```bash
# PostgreSQL backup
pg_dump -h localhost -U react_starter_kit react_starter_kit_production > backup_$(date +%Y%m%d_%H%M%S).sql

# MySQL backup
mysqldump -u react_starter_kit -p react_starter_kit_production > backup_$(date +%Y%m%d_%H%M%S).sql

# Automated backup script
#!/bin/bash
BACKUP_DIR="/var/backups/react-starter-kit"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Database backup
pg_dump -h localhost -U react_starter_kit react_starter_kit_production > $BACKUP_DIR/db_$TIMESTAMP.sql

# Application backup
tar -czf $BACKUP_DIR/app_$TIMESTAMP.tar.gz -C /var/www react-starter-kit

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

### File System Backups

```bash
# Create backup script
cat > /usr/local/bin/backup-react-starter-kit << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/react-starter-kit"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SOURCE_DIR="/var/www/react-starter-kit"

mkdir -p $BACKUP_DIR

# Create application backup
tar --exclude='log/*' --exclude='tmp/*' --exclude='node_modules' \
    -czf $BACKUP_DIR/app_full_$TIMESTAMP.tar.gz \
    -C $(dirname $SOURCE_DIR) $(basename $SOURCE_DIR)

# Sync to remote backup server (optional)
rsync -avz $BACKUP_DIR/ backup-server:/backups/react-starter-kit/

echo "Backup completed: app_full_$TIMESTAMP.tar.gz"
EOF

chmod +x /usr/local/bin/backup-react-starter-kit

# Schedule backups
echo "0 2 * * * /usr/local/bin/backup-react-starter-kit" | crontab -
```

---

## Troubleshooting

### Common Deployment Issues

#### 1. Asset Compilation Errors
```bash
# Clear assets and recompile
rm -rf public/assets
RAILS_ENV=production bundle exec rails assets:clobber
RAILS_ENV=production bundle exec rails assets:precompile

# Check for missing dependencies
npm install
bundle install
```

#### 2. Database Connection Issues
```bash
# Test database connection
RAILS_ENV=production bundle exec rails db:version

# Check database configuration
RAILS_ENV=production bundle exec rails runner "puts ActiveRecord::Base.connection.execute('SELECT 1')"
```

#### 3. Permission Issues
```bash
# Fix file permissions
chown -R deploy:deploy /var/www/react-starter-kit
chmod -R 755 /var/www/react-starter-kit
chmod -R 644 /var/www/react-starter-kit/config/credentials*
```

#### 4. Memory Issues
```bash
# Check memory usage
free -h
ps aux --sort=-%mem | head

# Optimize Ruby memory
export RUBY_GC_HEAP_INIT_SLOTS=1000000
export RUBY_GC_HEAP_FREE_SLOTS=500000
export RUBY_GC_HEAP_GROWTH_FACTOR=1.1
```

#### 5. Container Issues
```bash
# Debug container
docker logs react-starter-kit
docker exec -it react-starter-kit /bin/bash

# Check resource usage
docker stats react-starter-kit
docker inspect react-starter-kit
```

### Performance Tuning

#### Application Level
```ruby
# config/puma.rb
workers ENV.fetch("WEB_CONCURRENCY") { 2 }
threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
threads threads_count, threads_count

preload_app!

before_fork do
  ActiveRecord::Base.connection_pool.disconnect! if defined?(ActiveRecord)
end

on_worker_boot do
  ActiveRecord::Base.establish_connection if defined?(ActiveRecord)
end
```

#### System Level
```bash
# Increase file limits
echo "deploy soft nofile 65536" >> /etc/security/limits.conf
echo "deploy hard nofile 65536" >> /etc/security/limits.conf

# Optimize kernel parameters
echo "net.core.somaxconn = 65536" >> /etc/sysctl.conf
echo "net.ipv4.tcp_max_syn_backlog = 65536" >> /etc/sysctl.conf
sysctl -p
```

---

This deployment guide covers the most common deployment scenarios for the React Starter Kit. Choose the deployment method that best fits your infrastructure and requirements. Remember to always test deployments in a staging environment before deploying to production.
