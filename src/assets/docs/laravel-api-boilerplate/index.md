# Laravel API Boilerplate

A robust, modular Laravel 12 API boilerplate designed for scalability and modern development best practices.

## Tech Stack

- **Framework:** Laravel 12
- **PHP:** 8.2+
- **Authentication:** [Laravel Sanctum](https://laravel.com/docs/11.x/sanctum)
- **Permissions:** [Spatie Laravel Permission](https://spatie.be/docs/laravel-permission/v6/introduction)
- **Activity Logging:** [Spatie Laravel Activitylog](https://spatie.be/docs/laravel-activitylog/v4/introduction)
- **Code Quality:** [Laravel Pint](https://laravel.com/docs/11.x/pint), [Rector](https://getrector.org/)
- **Deployment:** [Deployer](https://deployer.org/)
- **Modular Structure:** [Laravel Modular](https://github.com/saeedvir/laravel-modular) (by [saeedvir](https://github.com/saeedvir))

## Key Features

### Authentication & User Management

- **Complete Auth Suite:** Login, Registration, Password Reset, Email Verification.
- **Profile Management:** Update profile details, change password, and "Me" endpoint.
- **Role-Based Access Control (RBAC):** Manage roles and permissions using [Spatie's package](https://spatie.be/docs/laravel-permission/v6/introduction).
- **User Status:** Toggle user active/inactive status via API or CLI.

### Media Management

- **Upload & Manage:** Dedicated media endpoints for handling file uploads.
- **S3 Support:** Ready for AWS S3 or compatible storage (via Flysystem).

### Notifications

- **System Notifications:** Fetch unread count, mark as read, and mark all as read.

### Developer Tools & Utilities

- **API Documentation:** Auto-generate Swagger/OpenAPI style documentation.
- **Refactoring:** Automated refactoring via Rector.
- **Coding Standard:** Consistent code style with Laravel Pint.
- **Modular Design:** Support for modular application structure.
- **Activity Log:** Track changes and user activities across the system.

### System Utilities

- **Health Check:** `/api/v1/up` endpoint for monitoring.
- **Common Utilities:** Generic "Toggle Active" and "Status" controllers for various models.

## Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/msamgan/laravel-api-boilerplate.git
   cd laravel-api-boilerplate
```

2. **Install dependencies:**
```bash
   composer install
```

3. **Environment Setup:**
```bash
   cp .env.example .env
   php artisan key:generate
```

4. **Run Migrations & Seeders:**
```bash
   php artisan migrate --seed
```

## API Documentation

The boilerplate includes a custom command to generate API documentation.

- **Generate Documentation:**
```bash
  composer generate-api-docs
```
  or
```bash
  php artisan app:generate-api-documentation --UI
```

## Modular Management

The project uses `saeedvir/laravel-modular` to manage its modular structure. This allows you to encapsulate features
into self-contained modules located in the `modules/` directory.

### Modular Commands

You can use the following Artisan commands to manage your modules:

- **Create a new module:**
```bash
  php artisan module:make {name}
```
- **List all modules:**
```bash
  php artisan module:list
```
- **Create module-specific components:**
```bash
  php artisan module:make-controller {module} {name}
  php artisan module:make-model {module} {name}
  php artisan module:make-migration {module} {name}
  php artisan module:make-request {module} {name}
```
- **Manage module status:**
```bash
  php artisan module:enable {module}
  php artisan module:disable {module}
```

### How it Works

1. **Autoloading:** Each module has its own `composer.json` file. The root `composer.json` uses the
   `wikimedia/composer-merge-plugin` to automatically merge and load these module-level dependencies and namespaces.
2. **Structure:** When a module is created, it follows the standard Laravel directory structure within the
   `modules/{ModuleName}` directory (e.g., `src/Http/Controllers`, `src/Models`, etc.).
3. **Registration:** Modules are automatically discovered and registered by the package, allowing you to use routes,
   migrations, and providers defined within the module.

## Code Quality

- **Format Code:**
```bash
  composer format
```
  This runs both Laravel Pint and Rector to ensure code quality and consistency.

## Deployment

The project uses [Deployer](https://deployer.org/) for automated deployments.

- **Deploy:**
```bash
  dep deploy
```
  *Note: Configure your host in `deploy.php`.*

## CLI Commands

- **Toggle User Status:**
```bash
  php artisan users:toggle-status {email} {--active=true|false}
```

## Testing

- **Run Tests:**
```bash
  composer test
```
  or
```bash
  php artisan test
```
