# python version 3.11.4
FROM python:3.11-slim

# name of docker image for backend 
WORKDIR /backend

# getting dependencies
COPY . /backend/

# installing dependencies
RUN pip install -r requirements.txt

# saving everthing thing
COPY . .

# defualt port
EXPOSE 5000

ENV FLASK_APP=ARCANA.py
CMD ["flask", "run", "--host", "0.0.0.0"]