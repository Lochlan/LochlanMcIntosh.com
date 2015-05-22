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
