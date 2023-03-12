from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer
# Create your views here.

@api_view(["GET"]) # The methods that will be performed in this view
def getRoutes(request):


    # REVISAR LA SALIDA DE DJANGO CUANDO TENGA PROBLEMAS CON LAS URL
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/<str:pk>/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/<str:pk>/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]

    return Response(routes)


@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many= True)
    return Response(serializer.data)

@api_view(['GET'])
def getNote(request,pk):
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializer(notes, many= False)
    return Response(serializer.data)

@api_view(['POST'])
def createNote(request):
    data = request.data
    print(data)
    note = Note.objects.create(
        body = data['body']
    )
    serializer = NoteSerializer(note, many= False)
    return Response(serializer.data)


@api_view(['PUT'])
def updateNote(request,pk):
    data = request.data
    note = Note.objects.get(id = pk)
    
    serializer = NoteSerializer(instance =note, data=data ) #You get the instance to know which one u have to update
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteNote(request,pk):
    note = Note.objects.get(id = pk)
    note.delete()
    return Response("Note was deleted!")

