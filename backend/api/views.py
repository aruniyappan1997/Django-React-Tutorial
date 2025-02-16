from django.shortcuts import render
from django.contrib.auth.models import User
from api.models import Note
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, NoteSerializer
from rest_framework import generics

# Create your views here.

#######################################
# Create and Get Notes (API View)
#######################################

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            '''
            Since in Serailizer we are making author as read_only
            So we are manually over-riding the data 
            '''
            serializer.save(author=self.request.user)
        else:
            print(serializer.error)


#######################################
# Create and Get Notes (API View)
#######################################

class NoteDelte(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    

#######################################
# Create User (API View)
#######################################

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
