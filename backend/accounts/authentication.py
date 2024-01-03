from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        try:
            header = self.get_header(request)

            if header is None:
                # Retrieve the raw token from local storage
                raw_token = request.META.get("HTTP_AUTHORIZATION")
                if not raw_token or not raw_token.startswith("Bearer "):
                    return None
                raw_token = raw_token.split("Bearer ")[1].strip()
                # print("no header", raw_token)
            else:
                raw_token = self.get_raw_token(header)
                # print("header", raw_token) ok

            if raw_token is None:
                return None

            validated_token = self.get_validated_token(raw_token)
            # print("valid", validated_token)

            return self.get_user(validated_token), validated_token
        except Exception as e:
            # Handle exceptions as needed
            return None
