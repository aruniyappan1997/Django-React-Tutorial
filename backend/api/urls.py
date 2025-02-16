from django.urls import path
from api import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="notes-list"),
    path("notes/delete/<int:pk>/", views.NoteDelte.as_view(), name="delete-note"),
]