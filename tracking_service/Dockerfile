# Imagen de base para la construcción
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

# Instalar herramienta de línea de comandos de EF Core
RUN dotnet tool install --global dotnet-ef --version 6.*

# Copiar proyectos
COPY TrackingService/ ./TrackingService/
COPY TrackingService.Domain/ ./TrackingService.Domain/
COPY TrackingService.Repositories/ ./TrackingService.Repositories/
COPY TrackingService.Services/ ./TrackingService.Services/

# Restaurar dependencias
WORKDIR /app/TrackingService
RUN dotnet restore ./TrackingService.sln

# Publicar la API
RUN dotnet publish ./TrackingService.sln -c Release -o out

# Ejecutar migraciones de Entity Framework
#RUN /root/.dotnet/tools/dotnet-ef database update --project ../TrackingService.Repositories/TrackingService.Repositories.csproj

# Imagen de base para ejecutar la aplicación
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/TrackingService/out .
ENTRYPOINT ["dotnet", "TrackingServiceAPI.dll"]