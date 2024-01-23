
# Web Application E-commerce Store

🚀 Exciting News! Introducing my latest personal project: a state-of-the-art Web Application E-commerce Store crafted with passion and expertise. This project utilizes Django (Python), Next.js, TypeScript, Docker, and Nginx! 🌐💻

## Features

🔒 **Secure & Seamless**: Implemented JWT Authentication, user login, and register functionalities to ensure a secure and smooth experience for users. Forgot your password? No worries, a robust forgot password mechanism is in place.

🔍 **Smart Search & Filter**: Easily find your desired products with advanced search and filtering options. Categorize and narrow down your search by brand and categories, making your shopping experience more personalized.

🔄 **Containerized Brilliance**: Embracing the power of Docker, the application is containerized for efficiency and scalability, ensuring a consistent and reliable performance across various environments.

🛒 **Effortless Shopping**: Add products to your cart, customize items with CRUD options, and seamlessly complete your purchase. Integrated Razorpay for secure payments in test mode, providing a hassle-free and trustworthy payment experience.

🎨 **Cart Customization**: Tailor your shopping experience with customizable cart items. Easily manage, edit, and remove items as you see fit, ensuring your cart reflects your preferences.

🔗 **Cloud Database Magic**: Powering the platform is a PostgreSQL Cloud Database, delivering lightning-fast data retrieval and storage capabilities. Your information is in safe hands with robust database management.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Docker (if using Docker)
- Node.js (for Next.js)
- Python (for Django)
- npm or yarn (for Next.js)

### Setup Environment Variables

1. Create a `.env.local` file in the root of the project.
2. Copy the contents from `.env.example` into `.env.local`.
3. Modify the variables in `.env.local` according to your requirements.

### Running with Docker

#### Using Docker Compose

```bash
docker-compose up
```

This command will build and start the Docker containers defined in `docker-compose.yml`. Make sure to modify the `.env.local` file with your configuration before running the containers.

#### Using Docker (without Docker Compose)

```bash
docker build -t project-name .
docker run -p 8000:8000 -p 3000:3000 --env-file .env.local project-name
```

### Running Without Docker

#### For Django

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### For Next.js

```bash
cd frontend
npm install # or yarn install
npm run dev # or yarn dev
```

### Access the Application

Once the containers are up or the Django and Next.js servers are running, you can access the application at:

- Django Backend: [http://localhost:8000](http://localhost:8000)
- Next.js Frontend: [http://localhost:3000](http://localhost:3000)

Feel free to explore the project and start shopping on your brand new E-commerce platform! If you encounter any issues, have suggestions, or just want to say hi, please open an issue or send a message. Happy coding! 🚀🌐💻
