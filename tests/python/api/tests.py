from rest_framework import status
from rest_framework.test import APITestCase


class ContactTests(APITestCase):
    def test_post_contact(self):
        """
        Ensure we can POST to the contact endpoint.
        """
        data = {
            'name': 'Test User',
            'email': 'test@lochlanmcintosh.com',
            'subject': 'JavaScript Test Message',
            'text': 'This is a test.',
        }
        response = self.client.post('/api/contact/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(response.data, data)

    def test_post_contact_input_error(self):
        """
        Ensure POSTing to contact endpoint with incomplete data gives a 400 error.
        """
        response = self.client.post('/api/contact/', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_contact_input_throttle(self):
        """
        Ensure POSTing to contact endpoint too much gives a 429 error.
        """
        # 11th API request and after will give a 429, see throttles.py
        for i in range(0, 9):
            response = self.client.post('/api/contact/', {}, format='json')

        self.assertEqual(response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
