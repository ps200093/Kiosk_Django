from django import forms


class ExampleForm(forms.Form):
    print("여기가 ", forms)
    action = forms.CharField(widget=forms.HiddenInput(), initial='submit')
