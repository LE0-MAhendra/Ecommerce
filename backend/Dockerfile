FROM python:3.11.7-slim-bookworm

ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY . /backend

RUN python -m venv /opt/venv

RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/pip install --upgrade pip && \
    /opt/venv/bin/pip install -r requirements.txt && \
    chmod +x /backend/entrypoint.sh

CMD [ "/backend/entrypoint.sh" ]