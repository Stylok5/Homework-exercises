python manage.py dumpdata movies --output movies/seeds.json --indent=2;
python manage.py dumpdata directors --output directors/seeds.json --indent=2;
python manage.py dumpdata genres --output genres/seeds.json --indent=2;
python manage.py dumpdata comments --output comments/seeds.json --indent=2;
python manage.py dumpdata ratings --output ratings/seeds.json --indent=2;