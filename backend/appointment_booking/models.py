from django.db import models

# https://docs.djangoproject.com/en/3.2/topics/db/models/


class Patient(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)


class Appointment(models.Model):
    start_time = models.DateTimeField(auto_now=False)
    end_time = models.DateTimeField(auto_now=False)
    
    # Each appointment is mapped to one patient and one doctor
    patient = models.ForeignKey(Patient, on_delete=models.SET_NULL, blank=True, null=True)
    # doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, blank=True, null=True)
