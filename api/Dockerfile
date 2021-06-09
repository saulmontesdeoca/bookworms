FROM python:3.6-alpine

RUN apk update

WORKDIR /usr/src/app

ENV FLASK_APP=app.py

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . ./

EXPOSE 5000

CMD ["python", "app.py"]