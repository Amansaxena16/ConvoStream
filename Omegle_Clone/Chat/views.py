from django.shortcuts import render,redirect

# Create your views here.
def landingPage(request):
    if(request.method == 'POST'):
        name = request.POST.get('name')
        if name:
            return redirect('room',name=name)
    return render(request, "landingPage.html")


def room(request,name):
    print('name',name)
    return render(request,'room.html', {'name':name})
