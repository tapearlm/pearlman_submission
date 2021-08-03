from django.utils import timezone
from rest_framework.test import APITestCase

from .models import Appointment, Patient


class AppointmentBookingTestCase(APITestCase):
    def test_appointment_booking(self):
        appointment = Appointment.objects.create(start_time=timezone.now(), end_time=timezone.now()) #Make an appointment object
        patient = Patient.objects.create() #Make a patient object
        # Get the appointment from the db by primary key
        response = self.client.get(f"/appointments/{appointment.pk}/")
        
        # Check it's the right primary key
        assert response.json()["pk"] == appointment.pk
        
        # Adds a patient to the appointment
        response = self.client.patch(
            f"/appointments/{appointment.pk}/book/", {"patient_pk": patient.pk}, format="json"
        )
        assert response.status_code == 200
        assert response.data["pk"] == appointment.pk
        response = self.client.get(f"/appointments/{appointment.pk}/")
        assert response.status_code == 200
        # Test that the right patient has been added to the right appointment
        assert response.data["pk"] == appointment.pk
        assert response.data["patient"] == patient.pk
