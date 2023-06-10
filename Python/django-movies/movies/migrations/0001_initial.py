# Generated by Django 4.2 on 2023-04-14 20:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('genres', '0001_initial'),
        ('ratings', '0001_initial'),
        ('directors', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('cover_image', models.CharField(max_length=300)),
                ('director', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='movies', to='directors.director')),
                ('genres', models.ManyToManyField(related_name='movies', to='genres.genre')),
                ('rating', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='movies', to='ratings.rating')),
            ],
        ),
    ]