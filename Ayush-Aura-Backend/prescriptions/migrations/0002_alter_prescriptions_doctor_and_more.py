# Generated by Django 4.0.4 on 2022-05-09 02:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('prescriptions', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prescriptions',
            name='doctor',
            field=models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.CASCADE, related_name='doctorid', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='prescriptions',
            name='patient',
            field=models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.CASCADE, related_name='patientid', to=settings.AUTH_USER_MODEL),
        ),
    ]
