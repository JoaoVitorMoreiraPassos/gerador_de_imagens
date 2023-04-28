import openai
import asyncio
from key_getter import key_getter
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Create your views here.
def index(request):
    return render(request, "image_generator/index.html")

def generate(request):
    if request.method == "POST":
        try:
            text = request.POST["description"]
            openai.api_key = key_getter()
            response = openai.Image.create(
                prompt=f"{text}",
                n=1,
                size="1024x1024",
            )
        except:
            return render(request, "image_generator/index.html")

        image_url = response["data"][0]["url"]
        return JsonResponse({"url": image_url})
    