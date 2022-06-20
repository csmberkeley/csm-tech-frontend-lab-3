from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class Student(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    section = models.ForeignKey("Section", on_delete=models.CASCADE)
    course = models.ForeignKey("Course", on_delete=models.CASCADE)

    active = models.BooleanField()
    banned = models.BooleanField()

    def __str__(self):
        return f"Student {self.user.username} (id {self.id}) in {self.section.mentor.course.name}"


class Mentor(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    course = models.ForeignKey("Course", on_delete=models.CASCADE)

    def __str__(self):
        return f"Mentor {self.user.username} (id {self.id}) in {self.course.name}"


class Section(models.Model):
    mentor = models.OneToOneField("Mentor", on_delete=models.CASCADE)

    capacity = models.PositiveSmallIntegerField()
    description = models.CharField(max_length=100)

    def __str__(self):
        return f"Section by {self.mentor.user.username} (id {self.id})"


class Course(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return f"Course {self.name}"


class Attendance(models.Model):
    student = models.ForeignKey("Student", on_delete=models.CASCADE)

    date = models.DateField()
    presence = models.CharField(max_length=10)

    def __str__(self):
        return f"Attendance (id {self.id}) on {self.date} for {self.student.user.username} "
