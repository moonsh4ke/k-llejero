FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

COPY NotificationService/ ./NotificationService/
COPY NotificationService.Domain/ ./NotificationService.Domain/
COPY NotificationService.Repositories/ ./NotificationService.Repositories/
COPY NotificationService.Services/ ./NotificationService.Services/

WORKDIR /app/NotificationService

# Ejecutar dotnet restore para restaurar las dependencias.
RUN dotnet restore ./NotificationService.sln

# Publicar la API
RUN dotnet publish ./NotificationService.sln -c Release -o out

# Generar la imagen de runtime con la imagen de ASP.NET Core
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/NotificationService/out .
ENTRYPOINT ["dotnet", "NotificationService.dll"]