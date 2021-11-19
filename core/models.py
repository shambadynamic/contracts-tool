from django.db import models


class DataQuery(models.Model):
    data_code = models.CharField(max_length=100)
    band = models.CharField(max_length=100)
    scale = models.PositiveBigIntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    query = models.JSONField(null=True)
    query_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.data_code
