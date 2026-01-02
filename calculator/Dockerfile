# base image
FROM python:3.9-slim

# working dir
WORKDIR /app

# copy
COPY . /app

# run
RUN pip install -r requirements.txt

# expose port
EXPOSE 8000

# command
CMD ["python", "./app.py"]