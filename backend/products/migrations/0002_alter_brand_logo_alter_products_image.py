# Generated by Django 4.2.7 on 2023-12-22 07:27

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='brand',
            name='logo',
            field=cloudinary.models.CloudinaryField(max_length=255),
        ),
        migrations.AlterField(
            model_name='products',
            name='image',
            field=cloudinary.models.CloudinaryField(max_length=255),
        ),
    ]
