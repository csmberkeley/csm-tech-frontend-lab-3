from django.contrib import admin

from backend.models import User, Student, Mentor, Section, Course, Attendance


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "email", "first_name", "last_name")
    list_display_links = ("id", "username")
    list_filter = ("is_superuser", "is_staff")
    search_fields = ("username", "email", "first_name", "last_name")


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "section", "course", "active", "banned")
    list_display_links = ("id", "user")
    list_editable = ("active", "banned")
    search_fields = ("user__username", "user__first_name", "user__last_name")


@admin.register(Mentor)
class MentorAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "course")
    list_display_links = ("id", "user")
    search_fields = ("user__username", "user__first_name", "user__last_name")


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("id", "mentor", "capacity", "description")
    list_display_links = ("id", "mentor")
    search_fields = ("mentor__user__username", "mentor__user__first_name", "mentor__user__last_name")


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    list_display_links = ("id", "name")
    search_fields = ("name",)


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ("id", "student", "date", "presence")
    list_display_links = ("id", "student")
    list_filter = ("presence",)
    search_fields = ("student__user__username", "student__user__first_name", "student__user__last_name")
