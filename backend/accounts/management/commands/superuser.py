from django.core.management.base import BaseCommand, CommandError

from django.contrib.auth import get_user_model

from os import getenv

DJANGO_SUPERUSER_EMAIL = getenv("DJANGO_SUERPUSER_EMAIL")
DJANGO_SUPERUSER_FIRSTNAME = getenv("DJANGO_SUPERUSER_FIRSTNAME")
DJANGO_SUERPUSER_LASTNAME = getenv("DJANGO_SUPERUSER_FIRSTNAME")
DJANGO_SUPERUSER_PASSWORD = getenv("DJANGO_SUPERUSER_PASSWORD")


class Command(BaseCommand):
    help = "Create a superuser"

    def handle(self, *args, **options):
        try:
            User = get_user_model()
            user = User(
                email=DJANGO_SUPERUSER_EMAIL,
                first_name=DJANGO_SUPERUSER_FIRSTNAME,
                last_name=DJANGO_SUERPUSER_LASTNAME,
            )
            user.set_password(DJANGO_SUPERUSER_PASSWORD)
            user.is_admin = True
            user.is_active = True
            user.is_staff = True
            user.is_superuser = True
            user.save()
            self.stdout.write(self.style.SUCCESS("Successfully created new superuser"))
        except Exception as e:
            raise CommandError(e)
