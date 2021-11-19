from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit
from crispy_forms.helper import FormHelper
from django import forms
from django.shortcuts import render
from.models import DataQuery


class DataQueryForm(forms.ModelForm):
    class Meta:
        model = DataQuery
        fields = ['data_code', 'band', 'scale', 'start_date', 'end_date']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Fieldset("Fill in the Form",
                     'data_code',
                     'band',
                     'scale',
                     'start_date',
                     'end_date'
                     ),
            ButtonHolder(
                Submit('submit', 'Submit', css_class='btn btn-primary')
            )
        )
