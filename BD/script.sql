USE [TestPromPeru_Dev]
GO
/****** Object:  Table [dbo].[Auditoria]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Auditoria](
	[Audi_ID] [int] IDENTITY(1,1) NOT NULL,
	[Prog_ID] [int] NULL,
	[Clie_ID] [int] NULL,
	[Bann_ID] [int] NULL,
	[Info_ID] [int] NULL,
	[Requ_ID] [int] NULL,
	[Insc_ID] [int] NULL,
	[Bene_ID] [int] NULL,
	[Cexi_ID] [int] NULL,
	[Egra_ID] [int] NULL,
	[Cont_ID] [int] NULL,
	[Curs_ID] [int] NULL,
	[Mult_ID] [int] NULL,
	[Usua_ID] [int] NULL,
	[Preg_ID] [int] NULL,
	[Resp_ID] [int] NULL,
	[Eval_ID] [int] NULL,
	[Audi_UsuarioCreacion] [varchar](50) NULL,
	[Audi_UsuarioEdicion] [varchar](50) NULL,
	[Audi_UsuarioEliminacion] [varchar](50) NULL,
	[Audi_FechaCreacion] [datetime] NULL,
	[Audi_FechaEdicion] [datetime] NULL,
	[Audi_FechaEliminacion] [datetime] NULL,
	[Audi_IpCreacion] [varchar](20) NULL,
	[Audi_IpEdicion] [varchar](20) NULL,
	[Audi_IpEliminacion] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[Audi_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Banner]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Banner](
	[Bann_ID] [int] IDENTITY(1,1) NOT NULL,
	[Bann_Orden] [int] NULL,
	[Bann_Nombre] [varchar](200) NULL,
	[Bann_URLImagen] [varchar](255) NULL,
	[Bann_Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Bann_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Beneficio]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Beneficio](
	[Bene_ID] [int] IDENTITY(1,1) NOT NULL,
	[Bene_Nombre] [varchar](50) NULL,
	[Bene_Descripcion] [varchar](200) NULL,
	[Bene_Orden] [int] NULL,
	[Bene_URLImagen] [varchar](255) NULL,
	[Bene_URLIcon] [varchar](255) NULL,
	[Bene_Activo] [bit] NOT NULL,
	[Bene_Titulo] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Bene_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CasoExito]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CasoExito](
	[Cexi_ID] [int] IDENTITY(1,1) NOT NULL,
	[Cexi_Nombre] [varchar](50) NULL,
	[Cexi_Orden] [int] NULL,
	[Cexi_Titulo] [varchar](50) NULL,
	[Cexi_UrlVideo] [varchar](255) NULL,
	[Cexi_TituloVideo] [varchar](50) NULL,
	[Cexi_NombreBoton] [varchar](50) NULL,
	[Cexi_UrlBoton] [varchar](50) NULL,
	[Cexi_Descripcion] [varchar](200) NULL,
	[Cexi_UrlIcon] [varchar](255) NULL,
	[Cexi_UrlPerfil] [varchar](255) NULL,
	[Cexi_UrlCabecera] [varchar](255) NULL,
	[Cexi_Activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Cexi_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[Clie_ID] [int] IDENTITY(1,1) NOT NULL,
	[Clie_RUC] [varchar](11) NULL,
	[Clie_RazonSocial] [varchar](20) NULL,
	[Clie_NombreComercial] [varchar](20) NULL,
	[Clie_Telefono] [varchar](15) NULL,
	[Clie_Celular] [varchar](15) NULL,
	[Clie_Correo] [varchar](50) NULL,
	[Clie_Region] [varchar](15) NULL,
	[Clie_Provincia] [varchar](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[Clie_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contacto]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contacto](
	[Cont_ID] [int] IDENTITY(1,1) NOT NULL,
	[Cont_Nombre] [varchar](50) NULL,
	[Cont_Apellido] [varchar](50) NULL,
	[Cont_Correo] [varchar](50) NULL,
	[Cont_Mensaje] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[Cont_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Curso]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Curso](
	[Curs_ID] [int] IDENTITY(1,1) NOT NULL,
	[Curs_NombreCurso] [varchar](50) NULL,
	[Curs_Descripcion] [varchar](200) NULL,
	[Curs_Objetivo] [varchar](200) NULL,
	[Curs_FechaInicio] [date] NULL,
	[Curs_FechaFin] [date] NULL,
	[Curs_DuracionHoras] [int] NULL,
	[Curs_Modalidad] [varchar](50) NULL,
	[Curs_Titulo] [varchar](50) NULL,
	[Curs_NombreBoton] [varchar](50) NULL,
	[Curs_UrlIcon] [varchar](255) NULL,
	[Curs_UrlIconBoton] [varchar](255) NULL,
	[Curs_UrlImagen] [varchar](255) NULL,
	[Curs_Orden] [int] NULL,
	[Curs_Activo] [bit] NOT NULL,
	[Curs_NombreBotonTitulo] [varchar](50) NULL,
	[Curs_TituloSeccion] [varchar](50) NULL,
	[Curs_LinkBoton] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[Curs_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmpresaGraduada]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmpresaGraduada](
	[Egra_ID] [int] IDENTITY(1,1) NOT NULL,
	[Egra_NombreEmpresa] [varchar](50) NULL,
	[Egra_Orden] [int] NULL,
	[Egra_Descripcion] [varchar](200) NULL,
	[Egra_Titulo] [varchar](50) NULL,
	[Egra_NombreBoton] [varchar](50) NULL,
	[Egra_UrlBoton] [varchar](50) NULL,
	[Egra_Region] [varchar](50) NULL,
	[Egra_Correo] [varchar](50) NULL,
	[Egra_PaginaWeb] [varchar](255) NULL,
	[Egra_RUC] [varchar](11) NULL,
	[Egra_RedesSociales] [varchar](50) NULL,
	[Egra_TipoEmpresa] [varchar](50) NULL,
	[Egra_Certificaciones] [varchar](50) NULL,
	[Egra_UrlLogo] [varchar](255) NULL,
	[Egra_Mercados] [varchar](50) NULL,
	[Egra_RazonSocial] [varchar](50) NULL,
	[Egra_SegmentosAtendidos] [varchar](50) NULL,
	[Egra_Direccion] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Egra_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Etapa]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Etapa](
	[Etap_ID] [int] IDENTITY(1,1) NOT NULL,
	[Clie_ID] [int] NULL,
	[Preg_ID] [int] NULL,
	[Etap_Etapa] [varchar](50) NULL,
	[Etap_Descripcion] [varchar](200) NULL,
	[Etap_Orden] [int] NULL,
	[Etap_FechaInscripcion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Etap_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Evaluacion]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Evaluacion](
	[Eval_ID] [int] IDENTITY(1,1) NOT NULL,
	[Eval_Alternativa] [varchar](1) NULL,
	[Eval_RespuestaCorrecta] [varchar](500) NULL,
	[Eval_Aprobado] [bit] NULL,
	[Eval_PuntajePregunta] [decimal](5, 2) NULL,
	[Eval_PuntajeIndividual] [decimal](5, 2) NULL,
	[Eval_PuntajeGlobal] [decimal](5, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[Eval_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Footer]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Footer](
	[Foot_ID] [int] IDENTITY(1,1) NOT NULL,
	[Foot_Nombre] [varchar](50) NULL,
	[Foot_Contacto] [varchar](100) NULL,
	[Foot_UrlIconContacto] [varchar](255) NULL,
	[Foot_Ubicacion] [varchar](200) NULL,
	[Foot_UrlIconUbicacion] [varchar](255) NULL,
	[Foot_UrlLogoPrincipal] [varchar](255) NULL,
	[Foot_UrlLogoSecundario] [varchar](255) NULL,
	[Foot_Ayuda] [varchar](50) NULL,
	[Foot_Comunicate] [varchar](50) NULL,
	[Foot_UrlIconMensaje] [varchar](255) NULL,
	[Foot_UrlIconWhatssap] [varchar](255) NULL,
	[Foot_Activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Foot_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Informacion]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Informacion](
	[Info_ID] [int] IDENTITY(1,1) NOT NULL,
	[Info_Titulo] [varchar](50) NULL,
	[Info_Descripcion] [varchar](max) NULL,
	[Info_URLPortada] [varchar](255) NULL,
	[Info_URLVideo] [varchar](255) NULL,
	[Info_Activo] [bit] NOT NULL,
	[Info_TituloSeccion] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Info_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inscripcion]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inscripcion](
	[Insc_ID] [int] IDENTITY(1,1) NOT NULL,
	[Insc_Titulo] [varchar](50) NULL,
	[Insc_Contenido] [varchar](200) NULL,
	[Insc_NombreBoton] [varchar](50) NULL,
	[Insc_URLIconBoton] [varchar](255) NULL,
	[Insc_Paso] [int] NULL,
	[Insc_TituloPaso] [varchar](50) NULL,
	[Insc_Descripcion] [varchar](255) NULL,
	[Insc_URLImagen] [varchar](255) NULL,
	[Insc_Orden] [int] NULL,
	[Insc_Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Insc_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Logo]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Logo](
	[Logo_ID] [int] IDENTITY(1,1) NOT NULL,
	[Logo_NombreBoton] [varchar](50) NULL,
	[Logo_UrlIconBoton] [varchar](255) NULL,
	[Logo_UrlPrincipal] [varchar](255) NULL,
	[Logo_UrlSecundario] [varchar](255) NULL,
	[Logo_Activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Logo_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Logro]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Logro](
	[Logr_ID] [int] IDENTITY(1,1) NOT NULL,
	[Logr_Nombre] [varchar](50) NULL,
	[Logr_Descripcion] [varchar](200) NULL,
	[Logr_UrlIcon] [varchar](255) NULL,
	[Logr_Activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Logr_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Menu]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Menu](
	[Menu_ID] [int] IDENTITY(1,1) NOT NULL,
	[Menu_Nombre] [varchar](50) NULL,
	[Menu_UrlIconBoton] [varchar](255) NULL,
	[Menu_Activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Menu_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Multimedia]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Multimedia](
	[Mult_ID] [int] IDENTITY(1,1) NOT NULL,
	[Mult_URLImagen] [varchar](255) NULL,
	[Mult_URLVideo] [varchar](255) NULL,
	[Mult_URLIcon] [varchar](255) NULL,
	[Mult_URLFile] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[Mult_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pregunta]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pregunta](
	[Preg_ID] [int] IDENTITY(1,1) NOT NULL,
	[Resp_ID] [int] NULL,
	[Eval_ID] [int] NULL,
	[Preg_Pregunta] [varchar](500) NULL,
	[Preg_Orden] [int] NULL,
	[Preg_TipoPregunta] [varchar](50) NULL,
	[Preg_FechaCreacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Preg_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Programa]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Programa](
	[Prog_ID] [int] IDENTITY(1,1) NOT NULL,
	[Clie_ID] [int] NULL,
	[Bann_ID] [int] NULL,
	[Info_ID] [int] NULL,
	[Requ_ID] [int] NULL,
	[Insc_ID] [int] NULL,
	[Bene_ID] [int] NULL,
	[Cexi_ID] [int] NULL,
	[Egra_ID] [int] NULL,
	[Cont_ID] [int] NULL,
	[Curs_ID] [int] NULL,
	[Mult_ID] [int] NULL,
	[Prog_Titulo] [varchar](50) NULL,
	[Prog_Contenido] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[Prog_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Requisito]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Requisito](
	[Requ_ID] [int] IDENTITY(1,1) NOT NULL,
	[Requ_Orden] [int] NULL,
	[Requ_Titulo] [varchar](50) NULL,
	[Requ_Descripcion] [varchar](500) NULL,
	[Requ_URLIcon] [varchar](255) NULL,
	[Requ_URLImagen] [varchar](255) NULL,
	[Requ_Activo] [bit] NOT NULL,
	[Requ_Nombre] [varchar](50) NULL,
	[Requ_TituloSeccion] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Requ_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Respuesta]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Respuesta](
	[Resp_ID] [int] IDENTITY(1,1) NOT NULL,
	[Resp_Alternativa] [varchar](1) NULL,
	[Resp_Respuesta] [varchar](500) NULL,
	[Resp_Orden] [int] NULL,
	[Resp_FechaRespuesta] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Resp_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Testimonio]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Testimonio](
	[Test_ID] [int] IDENTITY(1,1) NOT NULL,
	[Test_Nombre] [varchar](50) NULL,
	[Test_Descripcion] [varchar](200) NULL,
	[Test_UrlIcon] [varchar](255) NULL,
	[Test_UrlImagen] [varchar](255) NULL,
	[Test_Activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Test_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Usua_ID] [int] IDENTITY(1,1) NOT NULL,
	[Usua_Usuario] [varchar](50) NULL,
	[Usua_Contrasenia] [varchar](200) NULL,
	[Usua_Cargo] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Usua_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Auditoria] ON 

INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (17, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-12T21:08:37.010' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (21, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-12T21:33:29.413' AS DateTime), CAST(N'2025-01-12T21:33:29.413' AS DateTime), NULL, NULL, N'', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (22, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-12T21:36:14.080' AS DateTime), NULL, NULL, N'', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (23, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-12T21:37:14.483' AS DateTime), CAST(N'2025-01-12T21:37:14.483' AS DateTime), NULL, NULL, N'', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (27, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-12T21:52:10.627' AS DateTime), CAST(N'2025-01-12T21:52:10.627' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (28, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-12T21:52:30.363' AS DateTime), CAST(N'2025-01-12T21:52:30.363' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (29, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-12T21:52:36.263' AS DateTime), CAST(N'2025-01-12T21:52:36.263' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (30, NULL, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-12T21:56:54.837' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (31, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-12T21:59:44.830' AS DateTime), CAST(N'2025-01-12T21:59:44.830' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (32, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-12T21:59:55.300' AS DateTime), CAST(N'2025-01-12T21:59:55.300' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (33, NULL, NULL, 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-12T22:01:11.293' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (34, NULL, NULL, 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', CAST(N'2025-01-13T00:17:41.000' AS DateTime), NULL, CAST(N'2025-01-13T00:17:41.000' AS DateTime), NULL, NULL, N'::1')
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (35, NULL, NULL, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-13T00:19:27.417' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (36, NULL, NULL, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', CAST(N'2025-01-13T00:23:15.813' AS DateTime), NULL, CAST(N'2025-01-13T00:23:15.813' AS DateTime), NULL, NULL, N'::1')
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (37, NULL, NULL, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-13T00:23:36.637' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (38, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T02:01:36.673' AS DateTime), CAST(N'2025-01-13T02:01:36.673' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (39, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T13:58:59.833' AS DateTime), CAST(N'2025-01-13T13:58:59.833' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (40, NULL, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T13:59:07.547' AS DateTime), CAST(N'2025-01-13T13:59:07.547' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (41, NULL, NULL, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T13:59:08.977' AS DateTime), CAST(N'2025-01-13T13:59:08.977' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (42, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T14:11:10.530' AS DateTime), CAST(N'2025-01-13T14:11:10.530' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (43, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T14:11:34.940' AS DateTime), CAST(N'2025-01-13T14:11:34.940' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (44, NULL, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T14:11:38.817' AS DateTime), CAST(N'2025-01-13T14:11:38.817' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (45, NULL, NULL, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T14:11:41.107' AS DateTime), CAST(N'2025-01-13T14:11:41.107' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (46, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T14:11:53.723' AS DateTime), CAST(N'2025-01-13T14:11:53.723' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (47, NULL, NULL, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T14:11:55.433' AS DateTime), CAST(N'2025-01-13T14:11:55.433' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (48, NULL, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T14:11:57.593' AS DateTime), CAST(N'2025-01-13T14:11:57.593' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (49, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T14:15:24.523' AS DateTime), CAST(N'2025-01-13T14:15:24.523' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (50, NULL, NULL, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T14:15:25.040' AS DateTime), CAST(N'2025-01-13T14:15:25.040' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (51, NULL, NULL, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T14:15:27.213' AS DateTime), CAST(N'2025-01-13T14:15:27.213' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (52, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-13T15:39:49.223' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (53, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-13T16:42:18.160' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (54, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T17:59:06.320' AS DateTime), CAST(N'2025-01-13T17:59:06.320' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (55, NULL, NULL, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T17:59:23.277' AS DateTime), CAST(N'2025-01-13T17:59:23.277' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (56, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T18:34:15.750' AS DateTime), CAST(N'2025-01-13T18:34:15.750' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (57, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', CAST(N'2025-01-13T18:44:11.110' AS DateTime), NULL, CAST(N'2025-01-13T18:44:11.110' AS DateTime), NULL, NULL, N'::1')
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (58, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-13T18:45:53.073' AS DateTime), CAST(N'2025-01-13T18:45:53.073' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (59, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-14T00:32:57.110' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (60, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-14T13:58:35.743' AS DateTime), CAST(N'2025-01-14T13:58:35.743' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (61, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-14T14:00:02.533' AS DateTime), CAST(N'2025-01-14T14:00:02.533' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (62, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-14T14:00:48.003' AS DateTime), CAST(N'2025-01-14T14:00:48.003' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (63, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-14T14:01:02.850' AS DateTime), CAST(N'2025-01-14T14:01:02.850' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (64, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-14T14:06:47.573' AS DateTime), CAST(N'2025-01-14T14:06:47.573' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (65, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-14T14:11:49.003' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (66, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', CAST(N'2025-01-14T14:16:45.477' AS DateTime), NULL, CAST(N'2025-01-14T14:16:45.477' AS DateTime), NULL, NULL, N'::1')
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (67, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-14T14:17:04.610' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (68, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-14T14:18:38.867' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (69, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-14T14:38:12.423' AS DateTime), CAST(N'2025-01-14T14:38:12.423' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (70, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-14T14:38:12.730' AS DateTime), CAST(N'2025-01-14T14:38:12.730' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (71, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-14T14:38:13.757' AS DateTime), CAST(N'2025-01-14T14:38:13.757' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (72, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-14T14:38:34.560' AS DateTime), CAST(N'2025-01-14T14:38:34.560' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (73, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-14T14:38:34.947' AS DateTime), CAST(N'2025-01-14T14:38:34.947' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (74, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-14T14:38:36.587' AS DateTime), CAST(N'2025-01-14T14:38:36.587' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (75, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-15T00:18:18.293' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (76, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-15T00:18:41.500' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (77, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T00:52:05.247' AS DateTime), CAST(N'2025-01-15T00:52:05.247' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (78, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T01:05:19.747' AS DateTime), CAST(N'2025-01-15T01:05:19.747' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (79, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T01:19:00.220' AS DateTime), CAST(N'2025-01-15T01:19:00.220' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (80, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T02:08:32.313' AS DateTime), CAST(N'2025-01-15T02:08:32.313' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (81, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T02:19:36.727' AS DateTime), CAST(N'2025-01-15T02:19:36.727' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (82, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T02:20:05.673' AS DateTime), CAST(N'2025-01-15T02:20:05.673' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (83, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T02:20:32.550' AS DateTime), CAST(N'2025-01-15T02:20:32.550' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (84, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T02:20:44.240' AS DateTime), CAST(N'2025-01-15T02:20:44.240' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (85, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-15T02:20:56.800' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (86, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T02:35:10.173' AS DateTime), CAST(N'2025-01-15T02:35:10.173' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (87, NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-15T02:35:45.517' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (88, NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T02:36:00.390' AS DateTime), CAST(N'2025-01-15T02:36:00.390' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (89, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T13:38:32.557' AS DateTime), CAST(N'2025-01-15T13:38:32.557' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (90, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', CAST(N'2025-01-15T13:40:38.713' AS DateTime), NULL, CAST(N'2025-01-15T13:40:38.713' AS DateTime), NULL, NULL, N'::1')
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (91, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', CAST(N'2025-01-15T13:41:47.663' AS DateTime), NULL, CAST(N'2025-01-15T13:41:47.663' AS DateTime), NULL, NULL, N'::1')
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (92, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', CAST(N'2025-01-15T13:43:28.833' AS DateTime), NULL, CAST(N'2025-01-15T13:43:28.833' AS DateTime), NULL, NULL, N'::1')
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (93, NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', CAST(N'2025-01-15T13:43:45.137' AS DateTime), NULL, CAST(N'2025-01-15T13:43:45.137' AS DateTime), NULL, NULL, N'::1')
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (94, NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-15T13:52:23.137' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (95, NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T13:57:32.193' AS DateTime), CAST(N'2025-01-15T13:57:32.193' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (96, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T13:57:34.733' AS DateTime), CAST(N'2025-01-15T13:57:34.733' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (97, NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T13:58:53.077' AS DateTime), CAST(N'2025-01-15T13:58:53.077' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (98, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T13:59:03.263' AS DateTime), CAST(N'2025-01-15T13:59:03.263' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (99, NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T14:00:46.690' AS DateTime), CAST(N'2025-01-15T14:00:46.690' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (100, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T14:00:46.693' AS DateTime), CAST(N'2025-01-15T14:00:46.693' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (101, NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T14:03:04.013' AS DateTime), CAST(N'2025-01-15T14:03:04.013' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (102, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T14:03:17.710' AS DateTime), CAST(N'2025-01-15T14:03:17.710' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (103, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T14:03:31.013' AS DateTime), CAST(N'2025-01-15T14:03:31.013' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (104, NULL, NULL, NULL, NULL, NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T14:03:31.017' AS DateTime), CAST(N'2025-01-15T14:03:31.017' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (105, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-15T16:17:19.673' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (106, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-15T16:28:01.550' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (107, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-15T22:58:24.297' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (108, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T23:33:08.963' AS DateTime), CAST(N'2025-01-15T23:33:08.963' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (109, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T23:34:06.663' AS DateTime), CAST(N'2025-01-15T23:34:06.663' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (110, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T23:34:12.667' AS DateTime), CAST(N'2025-01-15T23:34:12.667' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (111, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T23:34:19.520' AS DateTime), CAST(N'2025-01-15T23:34:19.520' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (112, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T23:40:56.320' AS DateTime), CAST(N'2025-01-15T23:40:56.320' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (113, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T23:42:33.560' AS DateTime), CAST(N'2025-01-15T23:42:33.560' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (114, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T23:44:01.550' AS DateTime), CAST(N'2025-01-15T23:44:01.550' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (115, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-15T23:47:08.713' AS DateTime), CAST(N'2025-01-15T23:47:08.713' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (116, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', CAST(N'2025-01-16T00:22:08.737' AS DateTime), NULL, CAST(N'2025-01-16T00:22:08.737' AS DateTime), NULL, NULL, N'::1')
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (117, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-16T00:26:27.910' AS DateTime), CAST(N'2025-01-16T00:26:27.910' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (118, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-16T00:26:27.913' AS DateTime), CAST(N'2025-01-16T00:26:27.913' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (119, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-16T00:26:27.913' AS DateTime), CAST(N'2025-01-16T00:26:27.913' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (120, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-18T21:57:07.280' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (121, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-18T23:12:45.447' AS DateTime), CAST(N'2025-01-18T23:12:45.447' AS DateTime), NULL, NULL, N'::1', NULL)
GO
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (122, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-18T23:12:56.140' AS DateTime), CAST(N'2025-01-18T23:12:56.140' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (123, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-19T00:06:12.593' AS DateTime), CAST(N'2025-01-19T00:06:12.593' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (124, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-19T00:45:35.250' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (125, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-19T01:07:55.800' AS DateTime), CAST(N'2025-01-19T01:07:55.800' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (126, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-19T01:08:24.953' AS DateTime), CAST(N'2025-01-19T01:08:24.953' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (127, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', CAST(N'2025-01-19T01:14:17.817' AS DateTime), NULL, CAST(N'2025-01-19T01:14:17.817' AS DateTime), NULL, NULL, N'::1')
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (128, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-19T01:30:43.873' AS DateTime), CAST(N'2025-01-19T01:30:43.873' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (129, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-19T01:30:45.830' AS DateTime), CAST(N'2025-01-19T01:30:45.830' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (130, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-19T01:42:02.497' AS DateTime), CAST(N'2025-01-19T01:42:02.497' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (131, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-19T01:45:30.987' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (132, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-19T02:06:09.880' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (133, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-19T02:09:12.207' AS DateTime), CAST(N'2025-01-19T02:09:12.207' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (134, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-19T02:09:32.513' AS DateTime), CAST(N'2025-01-19T02:09:32.513' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (135, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', CAST(N'2025-01-19T02:11:45.167' AS DateTime), NULL, CAST(N'2025-01-19T02:11:45.167' AS DateTime), NULL, NULL, N'::1')
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (136, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-19T02:13:03.360' AS DateTime), CAST(N'2025-01-19T02:13:03.360' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (137, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-19T02:13:04.313' AS DateTime), CAST(N'2025-01-19T02:13:04.313' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (138, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-19T02:13:06.220' AS DateTime), CAST(N'2025-01-19T02:13:06.220' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (139, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-19T02:22:32.367' AS DateTime), CAST(N'2025-01-19T02:22:32.367' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (140, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-20T17:13:30.303' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (141, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-20T17:13:55.063' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (142, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, NULL, CAST(N'2025-01-20T17:14:08.033' AS DateTime), NULL, NULL, N'::1', NULL, NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (143, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-20T18:03:19.403' AS DateTime), CAST(N'2025-01-20T18:03:19.403' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (144, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-20T18:20:32.723' AS DateTime), CAST(N'2025-01-20T18:20:32.723' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (145, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-20T18:20:49.423' AS DateTime), CAST(N'2025-01-20T18:20:49.423' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (146, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', CAST(N'2025-01-20T18:21:59.783' AS DateTime), NULL, CAST(N'2025-01-20T18:21:59.783' AS DateTime), NULL, NULL, N'::1')
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (147, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-20T18:27:52.783' AS DateTime), CAST(N'2025-01-20T18:27:52.783' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (148, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-20T18:27:52.793' AS DateTime), CAST(N'2025-01-20T18:27:52.793' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (149, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-21T00:51:22.010' AS DateTime), CAST(N'2025-01-21T00:51:22.010' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (150, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-21T00:53:34.780' AS DateTime), CAST(N'2025-01-21T00:53:34.780' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (151, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-21T00:56:02.793' AS DateTime), CAST(N'2025-01-21T00:56:02.793' AS DateTime), NULL, NULL, N'::1', NULL)
INSERT [dbo].[Auditoria] ([Audi_ID], [Prog_ID], [Clie_ID], [Bann_ID], [Info_ID], [Requ_ID], [Insc_ID], [Bene_ID], [Cexi_ID], [Egra_ID], [Cont_ID], [Curs_ID], [Mult_ID], [Usua_ID], [Preg_ID], [Resp_ID], [Eval_ID], [Audi_UsuarioCreacion], [Audi_UsuarioEdicion], [Audi_UsuarioEliminacion], [Audi_FechaCreacion], [Audi_FechaEdicion], [Audi_FechaEliminacion], [Audi_IpCreacion], [Audi_IpEdicion], [Audi_IpEliminacion]) VALUES (152, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, N'Super_Admin', NULL, CAST(N'2025-01-21T00:57:42.987' AS DateTime), CAST(N'2025-01-21T00:57:42.987' AS DateTime), NULL, NULL, N'::1', NULL)
SET IDENTITY_INSERT [dbo].[Auditoria] OFF
GO
SET IDENTITY_INSERT [dbo].[Banner] ON 

INSERT [dbo].[Banner] ([Bann_ID], [Bann_Orden], [Bann_Nombre], [Bann_URLImagen], [Bann_Activo]) VALUES (22, 1, N' Los cursos especializados en turismo internacional son de
 libre elección y se desarrollan de forma virtual.', N'../../shared/assets/home/hero/hero-mobile.jpg', 1)
INSERT [dbo].[Banner] ([Bann_ID], [Bann_Orden], [Bann_Nombre], [Bann_URLImagen], [Bann_Activo]) VALUES (23, 3, N' Los cursos especializados en turismo internacional son de
 libre elección y se desarrollan de forma virtual. 2', N'../../shared/assets/home/hero/hero-mobile.jpg', 1)
INSERT [dbo].[Banner] ([Bann_ID], [Bann_Orden], [Bann_Nombre], [Bann_URLImagen], [Bann_Activo]) VALUES (24, 3, N' Los cursos especializados en turismo internacional son de
 libre elección y se desarrollan de forma virtual. 3', N'../../shared/assets/home/hero/hero-mobile.jpg', 1)
INSERT [dbo].[Banner] ([Bann_ID], [Bann_Orden], [Bann_Nombre], [Bann_URLImagen], [Bann_Activo]) VALUES (25, 4, N'12', N'123', 0)
INSERT [dbo].[Banner] ([Bann_ID], [Bann_Orden], [Bann_Nombre], [Bann_URLImagen], [Bann_Activo]) VALUES (26, 2, N'1', N'1', 1)
SET IDENTITY_INSERT [dbo].[Banner] OFF
GO
SET IDENTITY_INSERT [dbo].[Beneficio] ON 

INSERT [dbo].[Beneficio] ([Bene_ID], [Bene_Nombre], [Bene_Descripcion], [Bene_Orden], [Bene_URLImagen], [Bene_URLIcon], [Bene_Activo], [Bene_Titulo]) VALUES (1, NULL, NULL, 0, N'../../shared/assets/home/beneficios/img_beneficios.png', N'../../shared/assets/cursos/hero.png', 1, N'Beneficios 1')
INSERT [dbo].[Beneficio] ([Bene_ID], [Bene_Nombre], [Bene_Descripcion], [Bene_Orden], [Bene_URLImagen], [Bene_URLIcon], [Bene_Activo], [Bene_Titulo]) VALUES (2, N'Acceso a beneficios exclusivos', N'Disfruta de incentivos y ventajas diseñados exclusivamente para empresas graduadas, ayudándote a potenciar tu crecimiento y mantener una ventaja competitiva.', 3, N'../../shared/assets/beneficios/beneficios_item.png', N'../../shared/assets/beneficios/team.svg', 1, NULL)
INSERT [dbo].[Beneficio] ([Bene_ID], [Bene_Nombre], [Bene_Descripcion], [Bene_Orden], [Bene_URLImagen], [Bene_URLIcon], [Bene_Activo], [Bene_Titulo]) VALUES (3, N'Capacitaciones especializadas y gratuitas', N'Acceda a entrenamientos diseñados para el sector turístico, disponibles las 24 horas, los 7 días de la semana. Aprende a tu propio ritmo con la guía de expertos especializados en turismo.', 1, N'../../shared/assets/beneficios/beneficios_item.png', N'../../shared/assets/home/beneficios/administracion.png', 1, NULL)
INSERT [dbo].[Beneficio] ([Bene_ID], [Bene_Nombre], [Bene_Descripcion], [Bene_Orden], [Bene_URLImagen], [Bene_URLIcon], [Bene_Activo], [Bene_Titulo]) VALUES (4, N'Capacitaciones especializadas y gratuitas', N'Acceda a entrenamientos diseñados para el sector turístico, disponibles las 24 horas, los 7 días de la semana. Aprende a tu propio ritmo con la guía de expertos especializados en turismo.', 2, N'../../shared/assets/beneficios/beneficios_item.png', N'../../shared/assets/home/beneficios/administracion.png', 1, NULL)
INSERT [dbo].[Beneficio] ([Bene_ID], [Bene_Nombre], [Bene_Descripcion], [Bene_Orden], [Bene_URLImagen], [Bene_URLIcon], [Bene_Activo], [Bene_Titulo]) VALUES (5, N'Capacitaciones especializadas y gratuitas', N'Acceda a entrenamientos diseñados para el sector turístico, disponibles las 24 horas, los 7 días de la semana. Aprende a tu propio ritmo con la guía de expertos especializados en turismo.', 4, N'../../shared/assets/beneficios/beneficios_item.png', N'../../shared/assets/home/beneficios/administracion.png', 1, NULL)
SET IDENTITY_INSERT [dbo].[Beneficio] OFF
GO
SET IDENTITY_INSERT [dbo].[CasoExito] ON 

INSERT [dbo].[CasoExito] ([Cexi_ID], [Cexi_Nombre], [Cexi_Orden], [Cexi_Titulo], [Cexi_UrlVideo], [Cexi_TituloVideo], [Cexi_NombreBoton], [Cexi_UrlBoton], [Cexi_Descripcion], [Cexi_UrlIcon], [Cexi_UrlPerfil], [Cexi_UrlCabecera], [Cexi_Activo]) VALUES (1, NULL, 0, N'Casos de éxito 1', N'https://www.youtube.com/embed/3PHTlCsdBw8?si=-IerSaPQ3LsP1sk6', N'Testimiios de casos de éxito', N'Mira más videos', N'../../shared/assets/home/etapas/empezar_test.svg', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn', NULL, NULL, N'../../shared/assets/cursos/hero.png', 1)
INSERT [dbo].[CasoExito] ([Cexi_ID], [Cexi_Nombre], [Cexi_Orden], [Cexi_Titulo], [Cexi_UrlVideo], [Cexi_TituloVideo], [Cexi_NombreBoton], [Cexi_UrlBoton], [Cexi_Descripcion], [Cexi_UrlIcon], [Cexi_UrlPerfil], [Cexi_UrlCabecera], [Cexi_Activo]) VALUES (2, N'Fabiola Tahua', 2, NULL, N'https://www.youtube.com/watch?v=r6qWc4Yfs0k', NULL, NULL, NULL, N'Gerente General de Tahua Pottery', N'URL del ícono1', N'../../shared/assets/home/casos_exito/video_thumbnail.png', N'', 1)
INSERT [dbo].[CasoExito] ([Cexi_ID], [Cexi_Nombre], [Cexi_Orden], [Cexi_Titulo], [Cexi_UrlVideo], [Cexi_TituloVideo], [Cexi_NombreBoton], [Cexi_UrlBoton], [Cexi_Descripcion], [Cexi_UrlIcon], [Cexi_UrlPerfil], [Cexi_UrlCabecera], [Cexi_Activo]) VALUES (3, N'Fabiola Tahua 2', 1, NULL, N'https://www.youtube.com/embed/3PHTlCsdBw8?si=-IerSaPQ3LsP1sk6', NULL, NULL, NULL, N'Gerente General de Tahua Pottery 1', N'2', N'../../shared/assets/home/casos_exito/video_thumbnail.png', N'2', 1)
INSERT [dbo].[CasoExito] ([Cexi_ID], [Cexi_Nombre], [Cexi_Orden], [Cexi_Titulo], [Cexi_UrlVideo], [Cexi_TituloVideo], [Cexi_NombreBoton], [Cexi_UrlBoton], [Cexi_Descripcion], [Cexi_UrlIcon], [Cexi_UrlPerfil], [Cexi_UrlCabecera], [Cexi_Activo]) VALUES (4, N'Fabiola Tahua 3', 3, NULL, N'https://www.youtube.com/embed/r6qWc4Yfs0k', NULL, NULL, NULL, N'Gerente General de Tahua Pottery 2', N'3', N'../../shared/assets/home/casos_exito/video_thumbnail.png', N'3', 1)
SET IDENTITY_INSERT [dbo].[CasoExito] OFF
GO
SET IDENTITY_INSERT [dbo].[Curso] ON 

INSERT [dbo].[Curso] ([Curs_ID], [Curs_NombreCurso], [Curs_Descripcion], [Curs_Objetivo], [Curs_FechaInicio], [Curs_FechaFin], [Curs_DuracionHoras], [Curs_Modalidad], [Curs_Titulo], [Curs_NombreBoton], [Curs_UrlIcon], [Curs_UrlIconBoton], [Curs_UrlImagen], [Curs_Orden], [Curs_Activo], [Curs_NombreBotonTitulo], [Curs_TituloSeccion], [Curs_LinkBoton]) VALUES (1, NULL, N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn', NULL, NULL, NULL, 0, NULL, N'Cursos', NULL, NULL, N'../../shared/assets/home/etapas/empezar_test.svg', N'../../shared/assets/cursos/hero.png', 0, 1, N'Ver todo los cursos', N'Conoce nuestros cursos', NULL)
INSERT [dbo].[Curso] ([Curs_ID], [Curs_NombreCurso], [Curs_Descripcion], [Curs_Objetivo], [Curs_FechaInicio], [Curs_FechaFin], [Curs_DuracionHoras], [Curs_Modalidad], [Curs_Titulo], [Curs_NombreBoton], [Curs_UrlIcon], [Curs_UrlIconBoton], [Curs_UrlImagen], [Curs_Orden], [Curs_Activo], [Curs_NombreBotonTitulo], [Curs_TituloSeccion], [Curs_LinkBoton]) VALUES (2, N'Inovacion', N'orem ipsum dolor sit amet consectetur adipiscing, elit platea porta ut fermentum enim facilisi, nostra posuere duis vehicula', N'Objetivo del curso1', CAST(N'2025-01-18' AS Date), CAST(N'2025-01-19' AS Date), 0, N'Todo el Año', NULL, N'Descargar brochure 1', N'https://www.youtube.com/', NULL, N'../../shared/assets/home/cursos/card.png', 1, 1, NULL, NULL, N'https://www.youtube.com/')
INSERT [dbo].[Curso] ([Curs_ID], [Curs_NombreCurso], [Curs_Descripcion], [Curs_Objetivo], [Curs_FechaInicio], [Curs_FechaFin], [Curs_DuracionHoras], [Curs_Modalidad], [Curs_Titulo], [Curs_NombreBoton], [Curs_UrlIcon], [Curs_UrlIconBoton], [Curs_UrlImagen], [Curs_Orden], [Curs_Activo], [Curs_NombreBotonTitulo], [Curs_TituloSeccion], [Curs_LinkBoton]) VALUES (3, N'Fidelizacion', N'orem ipsum dolor sit amet consectetur adipiscing, elit platea porta ut fermentum enim facilisi, nostra posuere duis vehicula', N'Objetivo del curso 2', CAST(N'2025-01-18' AS Date), CAST(N'2025-01-19' AS Date), 0, N'Todo el Año', NULL, N'Descargar brochure 2', N'URL icono de boton 2', NULL, N'../../shared/assets/home/cursos/card.png', 2, 1, NULL, NULL, N'https://www.youtube.com/')
INSERT [dbo].[Curso] ([Curs_ID], [Curs_NombreCurso], [Curs_Descripcion], [Curs_Objetivo], [Curs_FechaInicio], [Curs_FechaFin], [Curs_DuracionHoras], [Curs_Modalidad], [Curs_Titulo], [Curs_NombreBoton], [Curs_UrlIcon], [Curs_UrlIconBoton], [Curs_UrlImagen], [Curs_Orden], [Curs_Activo], [Curs_NombreBotonTitulo], [Curs_TituloSeccion], [Curs_LinkBoton]) VALUES (4, N'Direccion Mkt', N'orem ipsum dolor sit amet consectetur adipiscing, elit platea porta ut fermentum enim facilisi, nostra posuere duis vehicula', N'Objetivo del curso3', CAST(N'2025-01-19' AS Date), CAST(N'2025-01-29' AS Date), 0, N'Todo el Año', NULL, N'Descargar brochure 3', N'URL icono de boton3', NULL, N'../../shared/assets/home/cursos/card.png', 3, 1, NULL, NULL, N'https://www.youtube.com/')
INSERT [dbo].[Curso] ([Curs_ID], [Curs_NombreCurso], [Curs_Descripcion], [Curs_Objetivo], [Curs_FechaInicio], [Curs_FechaFin], [Curs_DuracionHoras], [Curs_Modalidad], [Curs_Titulo], [Curs_NombreBoton], [Curs_UrlIcon], [Curs_UrlIconBoton], [Curs_UrlImagen], [Curs_Orden], [Curs_Activo], [Curs_NombreBotonTitulo], [Curs_TituloSeccion], [Curs_LinkBoton]) VALUES (5, N'Segmentación', N'orem ipsum dolor sit amet consectetur adipiscing, elit platea porta ut fermentum enim facilisi, nostra posuere duis vehicula', N'Objetivo del curso4', CAST(N'2025-01-19' AS Date), CAST(N'2025-01-30' AS Date), 0, N'Todo el Año', NULL, N'Descargar brochure 4', N'URL icono de boton5', NULL, N'../../shared/assets/home/cursos/card.png', 4, 1, NULL, NULL, N'https://www.youtube.com/')
SET IDENTITY_INSERT [dbo].[Curso] OFF
GO
SET IDENTITY_INSERT [dbo].[Footer] ON 

INSERT [dbo].[Footer] ([Foot_ID], [Foot_Nombre], [Foot_Contacto], [Foot_UrlIconContacto], [Foot_Ubicacion], [Foot_UrlIconUbicacion], [Foot_UrlLogoPrincipal], [Foot_UrlLogoSecundario], [Foot_Ayuda], [Foot_Comunicate], [Foot_UrlIconMensaje], [Foot_UrlIconWhatssap], [Foot_Activo]) VALUES (5, N'Comisión de Promoción del Perú para la exportación', N'            Central telefónica: (511) 616-7300 / 616-7400
', NULL, N'            Calle Uno Oeste 50, edificio Mincetur, pisos 13 y 14, San Isidro - Lima (Mesa de Partes (piso 1)) | De lunes a viernes de 9:00 a 17:00 horas
', NULL, N'../../shared/assets/logos/promperu-logo-footer.png', N'../../shared/assets/logos/logo_ministerio.png', N'¿Necesitas ayuda? 1', N'Comunicate con nosotros', NULL, NULL, 1)
SET IDENTITY_INSERT [dbo].[Footer] OFF
GO
SET IDENTITY_INSERT [dbo].[Informacion] ON 

INSERT [dbo].[Informacion] ([Info_ID], [Info_Titulo], [Info_Descripcion], [Info_URLPortada], [Info_URLVideo], [Info_Activo], [Info_TituloSeccion]) VALUES (1, N'¿Qué es?', N'El Programa Comercial para Empresas Turísticas es un programa de capacitación integral conformada por 10 cursos virtuales, que busca fortalecer las competencias comerciales de los dueños o tomadores de decisiones de las agencias de viajes y establecimientos de hospedaje MIPYMES a nivel nacional.', N'../../shared/assets/cursos/hero.png', N'https://www.youtube.com/embed/3PHTlCsdBw8?si=-IerSaPQ3LsP1sk6', 1, N'¿Qué es el Programa Comercial para Empresas Turísticas?')
INSERT [dbo].[Informacion] ([Info_ID], [Info_Titulo], [Info_Descripcion], [Info_URLPortada], [Info_URLVideo], [Info_Activo], [Info_TituloSeccion]) VALUES (2, N'123123123123', N'12312', N'1', N'1', 0, NULL)
SET IDENTITY_INSERT [dbo].[Informacion] OFF
GO
SET IDENTITY_INSERT [dbo].[Inscripcion] ON 

INSERT [dbo].[Inscripcion] ([Insc_ID], [Insc_Titulo], [Insc_Contenido], [Insc_NombreBoton], [Insc_URLIconBoton], [Insc_Paso], [Insc_TituloPaso], [Insc_Descripcion], [Insc_URLImagen], [Insc_Orden], [Insc_Activo]) VALUES (1, N'Etapas de Inscripción 1', N' Si su empresa cumple con los requisitos descritos en la sección
 anterior, los pasos para inscribirse en el programa son 1:', N'Empezar mi Test', N'../../shared/assets/home/etapas/empezar_test.svg', 0, NULL, NULL, NULL, 0, 1)
INSERT [dbo].[Inscripcion] ([Insc_ID], [Insc_Titulo], [Insc_Contenido], [Insc_NombreBoton], [Insc_URLIconBoton], [Insc_Paso], [Insc_TituloPaso], [Insc_Descripcion], [Insc_URLImagen], [Insc_Orden], [Insc_Activo]) VALUES (2, NULL, NULL, NULL, NULL, 1, N'Test de Diagnóstico', N' Es una herramienta de punto de partida, que ayuda a
 identificar la situación actual de la empresa.', N'../../shared/assets/home/etapas/search.svg', 1, 1)
INSERT [dbo].[Inscripcion] ([Insc_ID], [Insc_Titulo], [Insc_Contenido], [Insc_NombreBoton], [Insc_URLIconBoton], [Insc_Paso], [Insc_TituloPaso], [Insc_Descripcion], [Insc_URLImagen], [Insc_Orden], [Insc_Activo]) VALUES (3, NULL, NULL, NULL, NULL, 2, N'Inscripción del Programa', N' Es un requisito indispensable para acceder al Programa
 Comercial, luego de haber realizado el diagnóstico', N'../../shared/assets/home/etapas/inscripcion.svg', 2, 1)
INSERT [dbo].[Inscripcion] ([Insc_ID], [Insc_Titulo], [Insc_Contenido], [Insc_NombreBoton], [Insc_URLIconBoton], [Insc_Paso], [Insc_TituloPaso], [Insc_Descripcion], [Insc_URLImagen], [Insc_Orden], [Insc_Activo]) VALUES (4, NULL, NULL, NULL, NULL, 3, N'Inscripción de Cursos', N'Es hora de inscribirse al los cursos, modalidades y horarios
disponibles.', N'../../shared/assets/home/etapas/cursos.svg', 3, 1)
INSERT [dbo].[Inscripcion] ([Insc_ID], [Insc_Titulo], [Insc_Contenido], [Insc_NombreBoton], [Insc_URLIconBoton], [Insc_Paso], [Insc_TituloPaso], [Insc_Descripcion], [Insc_URLImagen], [Insc_Orden], [Insc_Activo]) VALUES (5, NULL, NULL, NULL, NULL, 4, N'Test de Salida', N' Luego de cumplir con los requisitos, la empresa es apta para
 recibir el diploma del reconocimiento del Programa', N'../../shared/assets/home/etapas/test.svg', 4, 1)
INSERT [dbo].[Inscripcion] ([Insc_ID], [Insc_Titulo], [Insc_Contenido], [Insc_NombreBoton], [Insc_URLIconBoton], [Insc_Paso], [Insc_TituloPaso], [Insc_Descripcion], [Insc_URLImagen], [Insc_Orden], [Insc_Activo]) VALUES (6, NULL, NULL, NULL, NULL, 5, N'2', N'2', N'6', 5, 0)
SET IDENTITY_INSERT [dbo].[Inscripcion] OFF
GO
SET IDENTITY_INSERT [dbo].[Logo] ON 

INSERT [dbo].[Logo] ([Logo_ID], [Logo_NombreBoton], [Logo_UrlIconBoton], [Logo_UrlPrincipal], [Logo_UrlSecundario], [Logo_Activo]) VALUES (1, N'Empezar mi test', N'../../shared/assets/icons/diagnostic.svg', N'../../shared/assets/logos/promperu-logo.png', NULL, 1)
SET IDENTITY_INSERT [dbo].[Logo] OFF
GO
SET IDENTITY_INSERT [dbo].[Logro] ON 

INSERT [dbo].[Logro] ([Logr_ID], [Logr_Nombre], [Logr_Descripcion], [Logr_UrlIcon], [Logr_Activo]) VALUES (1, N'Empresas Graduadas1', N'Contamos con mas de 100 empresas capacitadas y graduadas', N'../../shared/assets/icons/graduate.svg', 1)
INSERT [dbo].[Logro] ([Logr_ID], [Logr_Nombre], [Logr_Descripcion], [Logr_UrlIcon], [Logr_Activo]) VALUES (2, N'Test Realizados1', N' Se han realizado mas de 500 tests de diagnostico', N'../../shared/assets/icons/testdiagnostico.svg', 1)
INSERT [dbo].[Logro] ([Logr_ID], [Logr_Nombre], [Logr_Descripcion], [Logr_UrlIcon], [Logr_Activo]) VALUES (3, N'Cursos Actuales1', N'Actualmente contamos con 10 cursos enfocados en mejorar tu
empresa', N'../../shared/assets/icons/cursosActuales.svg', 1)
SET IDENTITY_INSERT [dbo].[Logro] OFF
GO
SET IDENTITY_INSERT [dbo].[Menu] ON 

INSERT [dbo].[Menu] ([Menu_ID], [Menu_Nombre], [Menu_UrlIconBoton], [Menu_Activo]) VALUES (1, N'¿Qué es?', N'/Informacion/Index', 1)
INSERT [dbo].[Menu] ([Menu_ID], [Menu_Nombre], [Menu_UrlIconBoton], [Menu_Activo]) VALUES (2, N'Cursos', N'/Curso/Index', 1)
INSERT [dbo].[Menu] ([Menu_ID], [Menu_Nombre], [Menu_UrlIconBoton], [Menu_Activo]) VALUES (3, N'Inscripción', N'/Inscripcion/Index', 1)
INSERT [dbo].[Menu] ([Menu_ID], [Menu_Nombre], [Menu_UrlIconBoton], [Menu_Activo]) VALUES (4, N'Requisitos', N'/Requisito/Index', 1)
INSERT [dbo].[Menu] ([Menu_ID], [Menu_Nombre], [Menu_UrlIconBoton], [Menu_Activo]) VALUES (5, N'Beneficios', N'/Beneficio/Index', 1)
INSERT [dbo].[Menu] ([Menu_ID], [Menu_Nombre], [Menu_UrlIconBoton], [Menu_Activo]) VALUES (6, N'Casos éxitos', N'/Caso/Index', 1)
INSERT [dbo].[Menu] ([Menu_ID], [Menu_Nombre], [Menu_UrlIconBoton], [Menu_Activo]) VALUES (7, N'Empresas', N'/Empresa/Index', 1)
INSERT [dbo].[Menu] ([Menu_ID], [Menu_Nombre], [Menu_UrlIconBoton], [Menu_Activo]) VALUES (8, N'Contacto', N'/Contacto/Index', 1)
SET IDENTITY_INSERT [dbo].[Menu] OFF
GO
SET IDENTITY_INSERT [dbo].[Requisito] ON 

INSERT [dbo].[Requisito] ([Requ_ID], [Requ_Orden], [Requ_Titulo], [Requ_Descripcion], [Requ_URLIcon], [Requ_URLImagen], [Requ_Activo], [Requ_Nombre], [Requ_TituloSeccion]) VALUES (1, 0, N'Requisitos', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn', NULL, N'../../shared/assets/cursos/hero.png', 1, NULL, N'Entérate de nuestros requisitos')
INSERT [dbo].[Requisito] ([Requ_ID], [Requ_Orden], [Requ_Titulo], [Requ_Descripcion], [Requ_URLIcon], [Requ_URLImagen], [Requ_Activo], [Requ_Nombre], [Requ_TituloSeccion]) VALUES (2, 2, NULL, N'No tener sanciones en el registro "Mira a quién le compras" de
INDECOPI impuestas en los doce(12) último meses.', N'../../shared/assets/home/nrequisitos/sin_sancion.svg', N'../../shared/assets/requisitos/requisitos.png', 1, N'Sin sanción en INDECOPI', NULL)
INSERT [dbo].[Requisito] ([Requ_ID], [Requ_Orden], [Requ_Titulo], [Requ_Descripcion], [Requ_URLIcon], [Requ_URLImagen], [Requ_Activo], [Requ_Nombre], [Requ_TituloSeccion]) VALUES (3, 2, NULL, N'No tener sanciones en el registro "Mira a quién le compras" de
    INDECOPI impuestas en los doce(12) último meses.', N'../../shared/assets/home/nrequisitos/no_tener_adeudos.svg', N'../../shared/assets/requisitos/requisitos.png', 1, N'No tener adeudos en PROMPERU', NULL)
INSERT [dbo].[Requisito] ([Requ_ID], [Requ_Orden], [Requ_Titulo], [Requ_Descripcion], [Requ_URLIcon], [Requ_URLImagen], [Requ_Activo], [Requ_Nombre], [Requ_TituloSeccion]) VALUES (4, 1, NULL, N'No tener sanciones en el registro "Mira a quién le compras" de
                        INDEOPI 12) último meses.', N'../../shared/assets/home/nrequisitos/viajes.svg', N'../../shared/assets/requisitos/requisitos.png', 1, N'Agencia de viajes u hospedaje', NULL)
INSERT [dbo].[Requisito] ([Requ_ID], [Requ_Orden], [Requ_Titulo], [Requ_Descripcion], [Requ_URLIcon], [Requ_URLImagen], [Requ_Activo], [Requ_Nombre], [Requ_TituloSeccion]) VALUES (5, 3, NULL, N'No tener sanciones en el registro "Mira a quién le compras" de
   INDECOPI impuestas en los doce(12) último meses.', N'../../shared/assets/home/nrequisitos/operacion.svg', N'../../shared/assets/requisitos/requisitos.png', 1, N'Años de Operación', NULL)
SET IDENTITY_INSERT [dbo].[Requisito] OFF
GO
SET IDENTITY_INSERT [dbo].[Testimonio] ON 

INSERT [dbo].[Testimonio] ([Test_ID], [Test_Nombre], [Test_Descripcion], [Test_UrlIcon], [Test_UrlImagen], [Test_Activo]) VALUES (1, N'Testimoniales1', N'', NULL, N'', 1)
INSERT [dbo].[Testimonio] ([Test_ID], [Test_Nombre], [Test_Descripcion], [Test_UrlIcon], [Test_UrlImagen], [Test_Activo]) VALUES (2, NULL, N'Los cursos me ayudaron a optimizar procesos y mejorar la experiencia de mis clientes turísticos.', NULL, N'../../shared/assets/home/testimoniales/avatar.png', 1)
INSERT [dbo].[Testimonio] ([Test_ID], [Test_Nombre], [Test_Descripcion], [Test_UrlIcon], [Test_UrlImagen], [Test_Activo]) VALUES (3, NULL, N'Los cursos me ayudaron a optimizar procesos y mejorar la experiencia de mis clientes turísticos.', NULL, N'../../shared/assets/home/testimoniales/avatar.png', 1)
INSERT [dbo].[Testimonio] ([Test_ID], [Test_Nombre], [Test_Descripcion], [Test_UrlIcon], [Test_UrlImagen], [Test_Activo]) VALUES (4, NULL, N'Los cursos me ayudaron a optimizar procesos y mejorar la experiencia de mis clientes turísticos.', NULL, N'../../shared/assets/home/testimoniales/avatar.png', 1)
SET IDENTITY_INSERT [dbo].[Testimonio] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Usua_ID], [Usua_Usuario], [Usua_Contrasenia], [Usua_Cargo]) VALUES (1, N'Super_Admin', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', N'Super Administrador')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[Banner] ADD  DEFAULT ((1)) FOR [Bann_Activo]
GO
ALTER TABLE [dbo].[Beneficio] ADD  DEFAULT ((1)) FOR [Bene_Activo]
GO
ALTER TABLE [dbo].[CasoExito] ADD  DEFAULT ((1)) FOR [Cexi_Activo]
GO
ALTER TABLE [dbo].[Curso] ADD  DEFAULT ((1)) FOR [Curs_Activo]
GO
ALTER TABLE [dbo].[Footer] ADD  DEFAULT ((1)) FOR [Foot_Activo]
GO
ALTER TABLE [dbo].[Informacion] ADD  DEFAULT ((1)) FOR [Info_Activo]
GO
ALTER TABLE [dbo].[Inscripcion] ADD  DEFAULT ((1)) FOR [Insc_Activo]
GO
ALTER TABLE [dbo].[Logo] ADD  DEFAULT ((1)) FOR [Logo_Activo]
GO
ALTER TABLE [dbo].[Logro] ADD  DEFAULT ((1)) FOR [Logr_Activo]
GO
ALTER TABLE [dbo].[Menu] ADD  DEFAULT ((1)) FOR [Menu_Activo]
GO
ALTER TABLE [dbo].[Requisito] ADD  DEFAULT ((1)) FOR [Requ_Activo]
GO
ALTER TABLE [dbo].[Testimonio] ADD  DEFAULT ((1)) FOR [Test_Activo]
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Bann_ID])
REFERENCES [dbo].[Banner] ([Bann_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Bann_ID])
REFERENCES [dbo].[Banner] ([Bann_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Bene_ID])
REFERENCES [dbo].[Beneficio] ([Bene_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Bene_ID])
REFERENCES [dbo].[Beneficio] ([Bene_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Cexi_ID])
REFERENCES [dbo].[CasoExito] ([Cexi_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Cexi_ID])
REFERENCES [dbo].[CasoExito] ([Cexi_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Clie_ID])
REFERENCES [dbo].[Cliente] ([Clie_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Clie_ID])
REFERENCES [dbo].[Cliente] ([Clie_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Cont_ID])
REFERENCES [dbo].[Contacto] ([Cont_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Cont_ID])
REFERENCES [dbo].[Contacto] ([Cont_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Curs_ID])
REFERENCES [dbo].[Curso] ([Curs_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Curs_ID])
REFERENCES [dbo].[Curso] ([Curs_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Egra_ID])
REFERENCES [dbo].[EmpresaGraduada] ([Egra_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Egra_ID])
REFERENCES [dbo].[EmpresaGraduada] ([Egra_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Eval_ID])
REFERENCES [dbo].[Evaluacion] ([Eval_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Eval_ID])
REFERENCES [dbo].[Evaluacion] ([Eval_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Info_ID])
REFERENCES [dbo].[Informacion] ([Info_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Info_ID])
REFERENCES [dbo].[Informacion] ([Info_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Insc_ID])
REFERENCES [dbo].[Inscripcion] ([Insc_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Insc_ID])
REFERENCES [dbo].[Inscripcion] ([Insc_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Preg_ID])
REFERENCES [dbo].[Pregunta] ([Preg_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Preg_ID])
REFERENCES [dbo].[Pregunta] ([Preg_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Prog_ID])
REFERENCES [dbo].[Programa] ([Prog_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Prog_ID])
REFERENCES [dbo].[Programa] ([Prog_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Requ_ID])
REFERENCES [dbo].[Requisito] ([Requ_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Requ_ID])
REFERENCES [dbo].[Requisito] ([Requ_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Resp_ID])
REFERENCES [dbo].[Respuesta] ([Resp_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Resp_ID])
REFERENCES [dbo].[Respuesta] ([Resp_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Usua_ID])
REFERENCES [dbo].[Usuario] ([Usua_ID])
GO
ALTER TABLE [dbo].[Auditoria]  WITH CHECK ADD FOREIGN KEY([Usua_ID])
REFERENCES [dbo].[Usuario] ([Usua_ID])
GO
ALTER TABLE [dbo].[Etapa]  WITH CHECK ADD FOREIGN KEY([Clie_ID])
REFERENCES [dbo].[Cliente] ([Clie_ID])
GO
ALTER TABLE [dbo].[Etapa]  WITH CHECK ADD FOREIGN KEY([Clie_ID])
REFERENCES [dbo].[Cliente] ([Clie_ID])
GO
ALTER TABLE [dbo].[Etapa]  WITH CHECK ADD FOREIGN KEY([Preg_ID])
REFERENCES [dbo].[Pregunta] ([Preg_ID])
GO
ALTER TABLE [dbo].[Etapa]  WITH CHECK ADD FOREIGN KEY([Preg_ID])
REFERENCES [dbo].[Pregunta] ([Preg_ID])
GO
ALTER TABLE [dbo].[Pregunta]  WITH CHECK ADD FOREIGN KEY([Eval_ID])
REFERENCES [dbo].[Evaluacion] ([Eval_ID])
GO
ALTER TABLE [dbo].[Pregunta]  WITH CHECK ADD FOREIGN KEY([Eval_ID])
REFERENCES [dbo].[Evaluacion] ([Eval_ID])
GO
ALTER TABLE [dbo].[Pregunta]  WITH CHECK ADD FOREIGN KEY([Resp_ID])
REFERENCES [dbo].[Respuesta] ([Resp_ID])
GO
ALTER TABLE [dbo].[Pregunta]  WITH CHECK ADD FOREIGN KEY([Resp_ID])
REFERENCES [dbo].[Respuesta] ([Resp_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Bann_ID])
REFERENCES [dbo].[Banner] ([Bann_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Bann_ID])
REFERENCES [dbo].[Banner] ([Bann_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Bene_ID])
REFERENCES [dbo].[Beneficio] ([Bene_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Bene_ID])
REFERENCES [dbo].[Beneficio] ([Bene_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Cexi_ID])
REFERENCES [dbo].[CasoExito] ([Cexi_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Cexi_ID])
REFERENCES [dbo].[CasoExito] ([Cexi_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Clie_ID])
REFERENCES [dbo].[Cliente] ([Clie_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Clie_ID])
REFERENCES [dbo].[Cliente] ([Clie_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Cont_ID])
REFERENCES [dbo].[Contacto] ([Cont_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Cont_ID])
REFERENCES [dbo].[Contacto] ([Cont_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Curs_ID])
REFERENCES [dbo].[Curso] ([Curs_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Curs_ID])
REFERENCES [dbo].[Curso] ([Curs_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Egra_ID])
REFERENCES [dbo].[EmpresaGraduada] ([Egra_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Egra_ID])
REFERENCES [dbo].[EmpresaGraduada] ([Egra_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Info_ID])
REFERENCES [dbo].[Informacion] ([Info_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Info_ID])
REFERENCES [dbo].[Informacion] ([Info_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Insc_ID])
REFERENCES [dbo].[Inscripcion] ([Insc_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Insc_ID])
REFERENCES [dbo].[Inscripcion] ([Insc_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Requ_ID])
REFERENCES [dbo].[Requisito] ([Requ_ID])
GO
ALTER TABLE [dbo].[Programa]  WITH CHECK ADD FOREIGN KEY([Requ_ID])
REFERENCES [dbo].[Requisito] ([Requ_ID])
GO
/****** Object:  StoredProcedure [dbo].[USP_Auditoria_INS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_Auditoria_INS] 
	@ID INT,
	@NombreTabla VARCHAR(50),   
    @Audi_Usuario VARCHAR(50),   
    @Audi_Ip VARCHAR(20) = NULL,
    @Audi_Accion CHAR(1) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Determinar la acción y preparar los valores a insertar
    DECLARE @Audi_UsuarioCreacion VARCHAR(50),
            @Audi_UsuarioEdicion VARCHAR(50),
            @Audi_UsuarioEliminacion VARCHAR(50),
            @Audi_FechaCreacion DATETIME,
            @Audi_FechaEdicion DATETIME,
            @Audi_FechaEliminacion DATETIME,
            @Audi_IpCreacion VARCHAR(20),
            @Audi_IpEdicion VARCHAR(20),
            @Audi_IpEliminacion VARCHAR(20),
			@Prog_ID INT = NULL,
			@Clie_ID INT = NULL,
			@Bann_ID INT = NULL,
			@Info_ID INT = NULL,
			@Requ_ID INT = NULL,
			@Insc_ID INT = NULL,
			@Bene_ID INT = NULL,
			@Cexi_ID INT = NULL,
			@Egra_ID INT = NULL,
			@Cont_ID INT = NULL,
			@Curs_ID INT = NULL,
			@Mult_ID INT = NULL,
			@Usua_ID INT = NULL,
			@Preg_ID INT = NULL,
			@Resp_ID INT = NULL,
			@Eval_ID INT = NULL

SET @Eval_ID = CASE WHEN @NombreTabla = 'Evaluacion' THEN @ID ELSE NULL END;
SET @Resp_ID = CASE WHEN @NombreTabla = 'Respuesta' THEN @ID ELSE NULL END;
SET @Preg_ID = CASE WHEN @NombreTabla = 'Pregunta' THEN @ID ELSE NULL END;
SET @Curs_ID = CASE WHEN @NombreTabla = 'Curso' THEN @ID ELSE NULL END;
SET @Mult_ID = CASE WHEN @NombreTabla = 'Multimedia' THEN @ID ELSE NULL END;
SET @Cont_ID = CASE WHEN @NombreTabla = 'Contacto' THEN @ID ELSE NULL END;
SET @Egra_ID = CASE WHEN @NombreTabla = 'EmpresaGraduada' THEN @ID ELSE NULL END;
SET @Cexi_ID = CASE WHEN @NombreTabla = 'CasoExito' THEN @ID ELSE NULL END;
SET @Bene_ID = CASE WHEN @NombreTabla = 'Beneficio' THEN @ID ELSE NULL END;
SET @Insc_ID = CASE WHEN @NombreTabla = 'Inscripcion' THEN @ID ELSE NULL END;
SET @Usua_ID = CASE WHEN @NombreTabla = 'Usuario' THEN @ID ELSE NULL END;
--SET @Audi_ID = CASE WHEN @NombreTabla = 'Auditoria' THEN @ID ELSE NULL END;
SET @Prog_ID = CASE WHEN @NombreTabla = 'Programa' THEN @ID ELSE NULL END;
SET @Requ_ID = CASE WHEN @NombreTabla = 'Requisito' THEN @ID ELSE NULL END;
SET @Info_ID = CASE WHEN @NombreTabla = 'Informacion' THEN @ID ELSE NULL END;
SET @Bann_ID = CASE WHEN @NombreTabla = 'Banner' THEN @ID ELSE NULL END;
SET @Clie_ID = CASE WHEN @NombreTabla = 'Cliente' THEN @ID ELSE NULL END;
--SET @Etap_ID = CASE WHEN @NombreTabla = 'Etapa' THEN @ID ELSE NULL END;

    SET @Audi_FechaCreacion = GETDATE();
    SET @Audi_FechaEdicion = NULL;
    SET @Audi_FechaEliminacion = NULL;

    -- Asignar valores según la acción
    IF @Audi_Accion = 'I' -- Insertar
    BEGIN
        SET @Audi_UsuarioCreacion = @Audi_Usuario;
        SET @Audi_IpCreacion = @Audi_Ip;
		SET @Audi_FechaCreacion = @Audi_FechaCreacion;
        SET @Audi_UsuarioEdicion = NULL;
        SET @Audi_UsuarioEliminacion = NULL;
        SET @Audi_IpEdicion = NULL;
        SET @Audi_IpEliminacion = NULL;
    END
    ELSE IF @Audi_Accion = 'E' -- Editar
    BEGIN
        SET @Audi_UsuarioCreacion = NULL;
        SET @Audi_IpCreacion = NULL;
        SET @Audi_UsuarioEdicion = @Audi_Usuario;
        SET @Audi_FechaEdicion = @Audi_FechaCreacion;
        SET @Audi_IpEdicion = @Audi_Ip;
        SET @Audi_UsuarioEliminacion = NULL;
        SET @Audi_IpEliminacion = NULL;
    END
    ELSE IF @Audi_Accion = 'D' -- Eliminar
    BEGIN
        SET @Audi_UsuarioCreacion = NULL;
        SET @Audi_IpCreacion = NULL;
        SET @Audi_UsuarioEdicion = NULL;
        SET @Audi_FechaEdicion = NULL;
        SET @Audi_IpEdicion = NULL;
        SET @Audi_UsuarioEliminacion = @Audi_Usuario;
        SET @Audi_FechaEliminacion = @Audi_FechaCreacion;
        SET @Audi_IpEliminacion = @Audi_Ip;
    END

    -- Insertar en la tabla Auditoria
    INSERT INTO Auditoria (
        Prog_ID, Clie_ID, Bann_ID, Info_ID, Requ_ID, Insc_ID, Bene_ID, Cexi_ID, Egra_ID, 
        Cont_ID, Curs_ID, Mult_ID, Usua_ID, Preg_ID, Resp_ID, Eval_ID, 
        Audi_UsuarioCreacion, Audi_UsuarioEdicion, Audi_UsuarioEliminacion, 
        Audi_FechaCreacion, Audi_FechaEdicion, Audi_FechaEliminacion, 
        Audi_IpCreacion, Audi_IpEdicion, Audi_IpEliminacion
    )
    VALUES (
        @Prog_ID, @Clie_ID, @Bann_ID, @Info_ID, @Requ_ID, @Insc_ID, @Bene_ID, @Cexi_ID, @Egra_ID, 
        @Cont_ID, @Curs_ID, @Mult_ID, @Usua_ID, @Preg_ID, @Resp_ID, @Eval_ID, 
        @Audi_UsuarioCreacion, @Audi_UsuarioEdicion, @Audi_UsuarioEliminacion, 
        @Audi_FechaCreacion, @Audi_FechaEdicion, @Audi_FechaEliminacion, 
        @Audi_IpCreacion, @Audi_IpEdicion, @Audi_IpEliminacion
    );
    
    -- Retornar el ID del registro recién insertado
    SELECT SCOPE_IDENTITY() AS Audi_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Banner_DEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Eliminación de Banner
CREATE PROCEDURE [dbo].[USP_Banner_DEL]
    @Bann_ID INT
AS
BEGIN
    UPDATE Banner
		SET Bann_Activo = 0
	WHERE Bann_ID = @Bann_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Banner_INS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Inserción en Banner
CREATE PROCEDURE [dbo].[USP_Banner_INS] 
    @Bann_Orden INT,
    @Bann_Nombre VARCHAR(200),
	@Bann_URLImagen VARCHAR(255),
	@NuevoID INT OUTPUT
AS
BEGIN

	DECLARE @Contador INT 
	SELECT  @Contador = count(*) from Banner WHERE Bann_Activo = 1
	SELECT @Contador
    INSERT INTO Banner ( Bann_Orden, Bann_Nombre,Bann_URLImagen)
    VALUES ( @Contador +1 , @Bann_Nombre,@Bann_URLImagen);

        SET @NuevoID = SCOPE_IDENTITY(); 

END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Banner_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Listado de todos los registros de Banner
CREATE PROCEDURE [dbo].[USP_Banner_LIS]
AS
BEGIN
    SELECT 
	Bann_ID,Bann_Orden, Bann_Nombre,Bann_URLImagen
    FROM Banner
	WHERE Bann_Activo = 1
	ORDER BY Bann_Orden ASC;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Banner_RPT]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Reporte de Banner (Ejemplo)
CREATE PROCEDURE [dbo].[USP_Banner_RPT]
AS
BEGIN
    SELECT Bann_ID, Bann_Nombre, Bann_Orden
    FROM Banner
    WHERE Bann_Orden > 1; -- Condición específica para reporte
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Banner_SEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Selección de un registro específico de Banner
CREATE PROCEDURE [dbo].[USP_Banner_SEL]
    @Bann_ID INT
AS
BEGIN
    SELECT Bann_ID, Mult_ID, Bann_Orden, Bann_Nombre
    FROM Banner
    WHERE Bann_ID = @Bann_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Banner_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Actualización de Banner
CREATE PROCEDURE [dbo].[USP_Banner_UPD]
    @Bann_ID INT,
	@Bann_Orden INT,
    @Bann_Nombre VARCHAR(200),
	@Bann_URLImagen VARCHAR(255)
AS
BEGIN
    UPDATE Banner
    SET 
        Bann_Nombre = @Bann_Nombre,
		Bann_Orden =  @Bann_Orden,
		Bann_URLImagen = @Bann_URLImagen
    WHERE Bann_ID = @Bann_ID;
		   
	 SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Beneficio_DEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Eliminación de Beneficio
CREATE PROCEDURE [dbo].[USP_Beneficio_DEL]
    @Bene_ID INT
AS
BEGIN
    UPDATE Beneficio
	SET Bene_Activo = 0
	WHERE Bene_ID = @Bene_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Beneficio_INS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para insertar un registro en la tabla Beneficio
CREATE PROCEDURE [dbo].[USP_Beneficio_INS]
	@Bene_Titulo VARCHAR(50) = NULL,
	@Bene_Nombre VARCHAR(50) = NULL,
	@Bene_Descripcion VARCHAR(200) = NULL,
	@Bene_Orden INT = NULL,
	@Bene_URLImagen VARCHAR(255) = NULL,
	@Bene_URLIcon VARCHAR(255) = NULL,
	@NuevoID INT OUTPUT
AS
BEGIN
	DECLARE @Contador INT 
	SELECT  @Contador = count(*) from Beneficio WHERE Bene_Activo = 1 and Bene_Orden <> 0
	SELECT @Contador
    INSERT INTO Beneficio (	
			Bene_Titulo,
			Bene_Nombre,
			Bene_Descripcion,
			Bene_Orden,
			Bene_URLImagen,
			Bene_URLIcon
				)
    VALUES (	
	@Bene_Titulo ,
	@Bene_Nombre ,
	@Bene_Descripcion ,
	@Contador +1 ,
	@Bene_URLImagen ,
	@Bene_URLIcon 
	);

	SET @NuevoID = SCOPE_IDENTITY(); 
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Beneficio_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para listar los registros en la tabla Beneficio
CREATE PROCEDURE [dbo].[USP_Beneficio_LIS]
AS
BEGIN
    SELECT Bene_ID,
	Bene_Titulo,
Bene_Nombre,
Bene_Descripcion,
Bene_Orden,
Bene_URLImagen,
Bene_URLIcon

    FROM Beneficio
	WHERE Bene_Activo = 1
	ORDER BY Bene_Orden ASC;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Beneficio_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para actualizar un registro en la tabla Beneficio
CREATE PROCEDURE [dbo].[USP_Beneficio_UPD]
	@Bene_ID  INT,
	@Bene_Titulo VARCHAR(50) = NULL,
	@Bene_Nombre VARCHAR(50) = NULL,
	@Bene_Descripcion VARCHAR(200) = NULL,
	@Bene_Orden INT = NULL,
	@Bene_URLImagen VARCHAR(255) = NULL,
	@Bene_URLIcon VARCHAR(255) = NULL
AS
BEGIN
    UPDATE Beneficio
    SET 	
	Bene_Titulo = @Bene_Titulo,
	Bene_Nombre = @Bene_Nombre,
	Bene_Descripcion = @Bene_Descripcion,
	Bene_Orden = @Bene_Orden,
	Bene_URLImagen = @Bene_URLImagen,
	Bene_URLIcon = @Bene_URLIcon
    WHERE 	Bene_ID = @Bene_ID;

	SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_CasoExito_DEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_CasoExito_DEL]
    @Cexi_ID INT
AS
BEGIN
    UPDATE CasoExito
	SET 
	Cexi_Activo = 0
	WHERE Cexi_ID = @Cexi_ID
END
GO
/****** Object:  StoredProcedure [dbo].[USP_CasoExito_INS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para insertar un registro en la tabla CasoExito
CREATE PROCEDURE [dbo].[USP_CasoExito_INS]	
	@Cexi_Nombre VARCHAR(50) = NULL,
	@Cexi_Orden INT = NULL,
	@Cexi_Titulo VARCHAR(50) = NULL,
	@Cexi_UrlVideo VARCHAR(255) = NULL,
	@Cexi_TituloVideo VARCHAR(50) = NULL,
	@Cexi_NombreBoton VARCHAR(50) = NULL,
	@Cexi_UrlBoton VARCHAR(255) = NULL,
	@Cexi_Descripcion VARCHAR(200) = NULL,
	@Cexi_UrlIcon VARCHAR(255) = NULL,
	@Cexi_UrlPerfil VARCHAR(255) = NULL,
	@Cexi_UrlCabecera VARCHAR(255) = NULL,
	@NuevoID INT OUTPUT
AS
BEGIN
	DECLARE @Contador INT 
	SELECT  @Contador = count(*) from CasoExito WHERE Cexi_Activo = 1 and Cexi_Orden <> 0
	SELECT @Contador
    INSERT INTO CasoExito (	
				Cexi_Nombre
				,Cexi_Orden
				,Cexi_Titulo
				,Cexi_UrlVideo
				,Cexi_TituloVideo
				,Cexi_NombreBoton
				,Cexi_UrlBoton
				,Cexi_Descripcion
				,Cexi_UrlIcon
				,Cexi_UrlPerfil
				,Cexi_UrlCabecera				
				)
    VALUES (	
				 @Cexi_Nombre
				,@Contador +1 
				,@Cexi_Titulo
				,@Cexi_UrlVideo
				,@Cexi_TituloVideo
				,@Cexi_NombreBoton
				,@Cexi_UrlBoton
				,@Cexi_Descripcion
				,@Cexi_UrlIcon
				,@Cexi_UrlPerfil
				,@Cexi_UrlCabecera	
	);

	SET @NuevoID = SCOPE_IDENTITY(); 
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_CasoExito_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_CasoExito_LIS]
AS
BEGIN
    SELECT 
	Cexi_ID
,Cexi_Nombre
,Cexi_Orden
,Cexi_Titulo
,Cexi_UrlVideo
,Cexi_TituloVideo
,Cexi_NombreBoton
,Cexi_UrlBoton
,Cexi_Descripcion
,Cexi_UrlIcon
,Cexi_UrlPerfil
,Cexi_UrlCabecera

FROM CasoExito
WHERE Cexi_Activo = 1
	ORDER BY Cexi_Orden ASC;
END
GO
/****** Object:  StoredProcedure [dbo].[USP_CasoExito_RPT]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_CasoExito_RPT]
AS
BEGIN
    SELECT 
        Cexi_ID, 
        Cexi_Casos, 
        Cexi_Orden, 
        Mult_URLImagen
    FROM CasoExito
    JOIN Multimedia ON CasoExito.Mult_ID = Multimedia.Mult_ID
END
GO
/****** Object:  StoredProcedure [dbo].[USP_CasoExito_SEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_CasoExito_SEL]
    @Cexi_ID INT
AS
BEGIN
    SELECT * FROM CasoExito WHERE Cexi_ID = @Cexi_ID
END
GO
/****** Object:  StoredProcedure [dbo].[USP_CasoExito_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_CasoExito_UPD]
	@Cexi_ID INT,
    @Cexi_Nombre VARCHAR(50) = NULL,
	@Cexi_Orden INT = NULL,
	@Cexi_Titulo VARCHAR(50) = NULL,
	@Cexi_UrlVideo VARCHAR(255) = NULL,
	@Cexi_TituloVideo VARCHAR(50) = NULL,
	@Cexi_NombreBoton VARCHAR(50) = NULL,
	@Cexi_UrlBoton VARCHAR(255) = NULL,
	@Cexi_Descripcion VARCHAR(200) = NULL,
	@Cexi_UrlIcon VARCHAR(255) = NULL,
	@Cexi_UrlPerfil VARCHAR(255) = NULL,
	@Cexi_UrlCabecera VARCHAR(255) = NULL
AS
BEGIN
    UPDATE CasoExito
    SET        
Cexi_Nombre		   = @Cexi_Nombre,
Cexi_Orden		   = @Cexi_Orden,
Cexi_Titulo		   = @Cexi_Titulo,
Cexi_UrlVideo	   = @Cexi_UrlVideo,
Cexi_TituloVideo   = @Cexi_TituloVideo,
Cexi_NombreBoton   = @Cexi_NombreBoton,
Cexi_UrlBoton	   = @Cexi_UrlBoton,
Cexi_Descripcion   = @Cexi_Descripcion,
Cexi_UrlIcon	   = @Cexi_UrlIcon,
Cexi_UrlPerfil	   = @Cexi_UrlPerfil,
Cexi_UrlCabecera   = @Cexi_UrlCabecera

    WHERE Cexi_ID = @Cexi_ID

	SELECT @@ROWCOUNT AS FilasAfectadas;
END
GO
/****** Object:  StoredProcedure [dbo].[USP_Curso_DEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Eliminación de Curso
CREATE PROCEDURE [dbo].[USP_Curso_DEL]
    @Curs_ID INT
AS
BEGIN
    UPDATE Curso
	SET Curs_Activo = 0
	WHERE  Curs_ID = @Curs_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Curso_INS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para insertar un registro en la tabla Curso
CREATE PROCEDURE [dbo].[USP_Curso_INS]
	@Curs_Titulo VARCHAR(50) = NULL,
	@Curs_TituloSeccion VARCHAR(50) = NULL,
	@Curs_NombreBoton VARCHAR(50) = NULL,
	@Curs_UrlIconBoton VARCHAR(255) = NULL,
	@Curs_NombreCurso VARCHAR(50) = NULL,
	@Curs_Objetivo VARCHAR(200) = NULL,
	@Curs_Descripcion VARCHAR(200) = NULL,
	@Curs_Orden INT = NULL,
	@Curs_FechaInicio DATE = NULL,
	@Curs_FechaFin DATE = NULL,
	@Curs_DuracionHoras INT = NULL,
	@Curs_Modalidad VARCHAR(50) = NULL,
	@Curs_URLImagen VARCHAR(255) = NULL,
	@Curs_URLIcon VARCHAR(255) = NULL,
	@Curs_NombreBotonTitulo VARCHAR(50) = NULL,
	@Curs_LinkBoton VARCHAR(255) = NULL,
	@NuevoID INT OUTPUT
AS
BEGIN
	DECLARE @Contador INT 
	SELECT  @Contador = count(*) from Curso WHERE Curs_Activo = 1 and Curs_Orden <> 0
	SELECT @Contador
    INSERT INTO Curso (	
			Curs_Titulo,
			Curs_TituloSeccion,
			Curs_NombreBoton,
			Curs_UrlIconBoton,
			Curs_NombreCurso,
			Curs_Objetivo,
			Curs_Descripcion,
			Curs_Orden,
			Curs_FechaInicio,
			Curs_FechaFin,
			Curs_DuracionHoras,
			Curs_Modalidad,
			Curs_URLImagen,
			Curs_URLIcon,
			Curs_NombreBotonTitulo,
			Curs_LinkBoton
				)
    VALUES (	
	@Curs_Titulo,
	@Curs_TituloSeccion,
	@Curs_NombreBoton,
	@Curs_UrlIconBoton,
	@Curs_NombreCurso,
	@Curs_Objetivo,
	@Curs_Descripcion,
	@Contador + 1,
	@Curs_FechaInicio,
	@Curs_FechaFin,
	@Curs_DuracionHoras,
	@Curs_Modalidad,
	@Curs_URLImagen,
	@Curs_URLIcon,
	@Curs_NombreBotonTitulo,
	@Curs_LinkBoton
	);

	SET @NuevoID = SCOPE_IDENTITY(); 
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Curso_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para listar los registros en la tabla Curso
CREATE PROCEDURE [dbo].[USP_Curso_LIS]
AS
BEGIN
    SELECT 
Curs_ID,
Curs_NombreCurso,
Curs_Descripcion,
Curs_Objetivo,
Curs_FechaInicio,
Curs_FechaFin,
Curs_DuracionHoras,
Curs_Modalidad,
Curs_Titulo,
Curs_TituloSeccion,
Curs_NombreBoton,
Curs_UrlIcon,
Curs_UrlIconBoton,
Curs_UrlImagen,
Curs_Orden,
Curs_NombreBotonTitulo,
Curs_LinkBoton

    FROM Curso
	WHERE Curs_Activo = 1
	ORDER BY Curs_Orden ASC;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Curso_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para actualizar un registro en la tabla Curso
CREATE PROCEDURE [dbo].[USP_Curso_UPD]
	@Curs_ID INT,
	@Curs_Titulo VARCHAR(50) = NULL,
	@Curs_TituloSeccion VARCHAR(50) = NULL,
	@Curs_NombreBoton VARCHAR(50) = NULL,
	@Curs_UrlIconBoton VARCHAR(255) = NULL,
	@Curs_NombreCurso VARCHAR(50) = NULL,
	@Curs_Objetivo VARCHAR(200) = NULL,
	@Curs_Descripcion VARCHAR(200) = NULL,
	@Curs_Orden INT = NULL,
	@Curs_FechaInicio DATE = NULL,
	@Curs_FechaFin DATE = NULL,
	@Curs_DuracionHoras INT = NULL,
	@Curs_Modalidad VARCHAR(50) = NULL,
	@Curs_URLImagen VARCHAR(255) = NULL,
	@Curs_URLIcon VARCHAR(255) = NULL,
	@Curs_NombreBotonTitulo VARCHAR(50) = NULL,
	@Curs_LinkBoton VARCHAR(255) = NULL
AS
BEGIN
    UPDATE Curso
    SET 	
			Curs_Titulo = @Curs_Titulo,
			Curs_TituloSeccion = @Curs_TituloSeccion,
			Curs_NombreBoton = @Curs_NombreBoton,
			Curs_UrlIconBoton = @Curs_UrlIconBoton,
			Curs_NombreCurso = @Curs_NombreCurso,
			Curs_Objetivo = @Curs_Objetivo,
			Curs_Descripcion = @Curs_Descripcion,
			Curs_Orden = @Curs_Orden,
			Curs_FechaInicio = @Curs_FechaInicio,
			Curs_FechaFin = @Curs_FechaFin,
			Curs_DuracionHoras = @Curs_DuracionHoras,
			Curs_Modalidad = @Curs_Modalidad,
			Curs_URLImagen = @Curs_URLImagen,
			Curs_NombreBotonTitulo = @Curs_NombreBotonTitulo,
			Curs_URLIcon =  @Curs_URLIcon,
			Curs_LinkBoton =@Curs_LinkBoton
    WHERE 	Curs_ID = @Curs_ID;

	SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Footer_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Listado de todos los registros de Footer
CREATE PROCEDURE [dbo].[USP_Footer_LIS]
AS
BEGIN
    SELECT 
	Foot_ID,
Foot_Nombre,
Foot_Contacto,
Foot_UrlIconContacto,
Foot_Ubicacion,
Foot_UrlIconUbicacion,
Foot_UrlLogoPrincipal,
Foot_UrlLogoSecundario,
Foot_Ayuda,
Foot_Comunicate,
Foot_UrlIconMensaje,
Foot_UrlIconWhatssap
    FROM Footer
	WHERE Foot_Activo = 1;

END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Footer_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Actualización de Footer
CREATE PROCEDURE [dbo].[USP_Footer_UPD]
    @Foot_ID INT,
	@Foot_Nombre VARCHAR(50),
    @Foot_Contacto VARCHAR(200),
	@Foot_UrlIconContacto VARCHAR(255),
	@Foot_Ubicacion VARCHAR(50),
	@Foot_UrlIconUbicacion VARCHAR(255),
	@Foot_UrlLogoPrincipal VARCHAR(255),
	@Foot_UrlLogoSecundario VARCHAR(255),
	@Foot_Ayuda VARCHAR(255),
	@Foot_Comunicate VARCHAR(255),
	@Foot_UrlIconMensaje VARCHAR(255),
	@Foot_UrlIconWhatssap VARCHAR(255)
AS
BEGIN
    UPDATE Footer
    SET 
        Foot_Nombre = @Foot_Nombre,
		Foot_Contacto =  @Foot_Contacto,
		Foot_UrlIconContacto = @Foot_UrlIconContacto,
		Foot_Ubicacion = @Foot_Ubicacion,
		Foot_UrlIconUbicacion =  @Foot_UrlIconUbicacion,
		Foot_UrlLogoPrincipal = @Foot_UrlLogoPrincipal,
		Foot_UrlLogoSecundario = @Foot_UrlLogoSecundario,
		Foot_Ayuda =  @Foot_Ayuda,
		Foot_Comunicate = @Foot_Comunicate,
		Foot_UrlIconMensaje = @Foot_UrlIconMensaje,
		Foot_UrlIconWhatssap = @Foot_UrlIconWhatssap
    WHERE Foot_ID = @Foot_ID;
		   
	 SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Informacion_DEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para eliminar un registro de la tabla Informacion
CREATE PROCEDURE [dbo].[USP_Informacion_DEL]
    @Info_ID INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Informacion
	SET Info_Activo = 0
    WHERE Info_ID = @Info_ID;

	SELECT @@ROWCOUNT AS FilasAfectadas;

	 SET NOCOUNT OFF;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Informacion_INS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para insertar un registro en la tabla Informacion
CREATE PROCEDURE [dbo].[USP_Informacion_INS] 
    @Info_Titulo VARCHAR(50),
	@Info_TituloSeccion VARCHAR(100),
    @Info_Descripcion VARCHAR(200),
	@Info_URLPortada  VARCHAR(255),
	@Info_URLVideo  VARCHAR(255),
	@NuevoID INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Informacion (Info_Titulo,Info_TituloSeccion, Info_Descripcion,Info_URLPortada,Info_URLVideo)
    VALUES (@Info_Titulo,@Info_TituloSeccion, @Info_Descripcion,@Info_URLPortada,@Info_URLVideo);

    SET @NuevoID = SCOPE_IDENTITY(); 
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Informacion_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para listar todos los registros de la tabla Informacion
CREATE PROCEDURE [dbo].[USP_Informacion_LIS]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Info_ID,Info_Titulo,Info_TituloSeccion, Info_Descripcion,Info_URLPortada,Info_URLVideo
    FROM Informacion
	WHERE Info_Activo=1;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Informacion_RPT]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento para generar un reporte desde la tabla Informacion
CREATE PROCEDURE [dbo].[USP_Informacion_RPT]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Info_ID, Mult_ID, Info_Titulo, Info_Descripcion
    FROM Informacion
    ORDER BY Info_Titulo ASC; -- Ordenar alfabéticamente por título como ejemplo
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Informacion_SEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para seleccionar un registro específico de la tabla Informacion
CREATE PROCEDURE [dbo].[USP_Informacion_SEL]
    @Info_ID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
			Info_ID,
			Info_Titulo,
			Info_Descripcion,
			Info_URLPortada,
			Info_URLVideo	
    FROM Informacion
    WHERE Info_ID = @Info_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Informacion_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para actualizar un registro de la tabla Informacion
CREATE PROCEDURE [dbo].[USP_Informacion_UPD]
    @Info_ID INT,
    @Info_Titulo VARCHAR(50),
	@Info_TituloSeccion VARCHAR(50),
    @Info_Descripcion VARCHAR(200),
	@Info_URLPortada VARCHAR(255),
	@Info_URLVideo VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Informacion
    SET 
        Info_Titulo = @Info_Titulo,
		Info_TituloSeccion= @Info_TituloSeccion,
        Info_Descripcion = @Info_Descripcion,
		 Info_URLPortada = @Info_URLPortada,
        Info_URLVideo = @Info_URLVideo
    WHERE Info_ID = @Info_ID;

	   SELECT @@ROWCOUNT AS FilasAfectadas;

	SET NOCOUNT OFF;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Inscripcion_DEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para eliminar un registro en la tabla Inscripcion
CREATE PROCEDURE [dbo].[USP_Inscripcion_DEL]
    @Insc_ID INT
AS
BEGIN
    UPDATE Inscripcion
	SET Insc_Activo = 0
    WHERE Insc_ID = @Insc_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Inscripcion_INS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para insertar un registro en la tabla Inscripcion
CREATE PROCEDURE [dbo].[USP_Inscripcion_INS]
	@Insc_Titulo VARCHAR(50) = NULL,
	@Insc_Contenido VARCHAR(200)  = NULL,
	@Insc_NombreBoton VARCHAR(50)  = NULL,
	@Insc_URLIconBoton VARCHAR(255)  = NULL,
	@Insc_Orden INT  = NULL,
	@Insc_Paso INT  = NULL,
	@Insc_TituloPaso VARCHAR(50)  = NULL,
	@Insc_Descripcion VARCHAR(255)  = NULL,
	@Insc_URLImagen VARCHAR(255)  = NULL,
	@NuevoID INT OUTPUT
AS
BEGIN
	DECLARE @Contador INT 
	SELECT  @Contador = count(*) from Inscripcion WHERE Insc_Activo = 1 and Insc_Orden <> 0
	SELECT @Contador
    INSERT INTO Inscripcion (
				Insc_Contenido,
				Insc_NombreBoton,
				Insc_URLIconBoton,
				Insc_Orden,
				Insc_Paso,
				Insc_TituloPaso,
				Insc_Titulo,
				Insc_Descripcion,
				Insc_URLImagen
				)
    VALUES (	@Insc_Contenido,
				@Insc_NombreBoton,
				@Insc_URLIconBoton,
				@Contador + 1 ,
				@Insc_Paso,
				@Insc_TituloPaso,
				@Insc_Titulo,
				@Insc_Descripcion,
				@Insc_URLImagen);

	SET @NuevoID = SCOPE_IDENTITY(); 
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Inscripcion_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para listar los registros en la tabla Inscripcion
CREATE PROCEDURE [dbo].[USP_Inscripcion_LIS]
AS
BEGIN
    SELECT Insc_ID,
Insc_Titulo,
Insc_Contenido,
Insc_NombreBoton,
Insc_URLIconBoton,
Insc_Paso,
Insc_TituloPaso,
Insc_Descripcion,
Insc_URLImagen,
Insc_Orden
    FROM Inscripcion
	WHERE Insc_Activo = 1
	ORDER BY Insc_Orden ASC;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Inscripcion_RPT]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento para generar un reporte de registros en la tabla Inscripcion
CREATE PROCEDURE [dbo].[USP_Inscripcion_RPT]
AS
BEGIN
    SELECT Insc_ID, Etap_ID, Mult_ID, Insc_Titulo, Insc_Contenido
    FROM Inscripcion
    ORDER BY Insc_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Inscripcion_SEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento para seleccionar un registro en la tabla Inscripcion
CREATE PROCEDURE [dbo].[USP_Inscripcion_SEL]
    @Insc_ID INT
AS
BEGIN
    SELECT Insc_ID, Etap_ID, Mult_ID, Insc_Titulo, Insc_Contenido
    FROM Inscripcion
    WHERE Insc_ID = @Insc_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Inscripcion_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para actualizar un registro en la tabla Inscripcion
CREATE PROCEDURE [dbo].[USP_Inscripcion_UPD]
	@Insc_ID  INT,
	@Insc_Titulo VARCHAR(50) = NULL,
	@Insc_Contenido VARCHAR(200)= NULL,
	@Insc_NombreBoton VARCHAR(50)= NULL,
	@Insc_URLIconBoton VARCHAR(255)= NULL,
	@Insc_Paso INT= NULL,
	@Insc_TituloPaso VARCHAR(50)= NULL,
	@Insc_Descripcion VARCHAR(255)= NULL,
	@Insc_URLImagen VARCHAR(255)= NULL,
	@Insc_Orden INT = NULL
AS
BEGIN
    UPDATE Inscripcion
    SET 	
	Insc_Titulo = @Insc_Titulo,
	Insc_Contenido = @Insc_Contenido,
	Insc_NombreBoton = @Insc_NombreBoton,
	Insc_URLIconBoton = @Insc_URLIconBoton,
	Insc_Paso = @Insc_Paso,
	Insc_TituloPaso = @Insc_TituloPaso,
	Insc_Descripcion = @Insc_Descripcion,
	Insc_URLImagen = @Insc_URLImagen,
	Insc_Orden = @Insc_Orden
    WHERE Insc_ID = @Insc_ID;

	SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Logo_DEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Eliminación de Logo
CREATE PROCEDURE [dbo].[USP_Logo_DEL]
    @Logo_ID INT
AS
BEGIN
    UPDATE Logo
		SET Logo_Activo = 0
	WHERE Logo_ID = @Logo_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Logo_INS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Inserción en Logo
CREATE PROCEDURE [dbo].[USP_Logo_INS]     
    @Logo_NombreBoton VARCHAR(50),
	@Logo_UrlIconBoton VARCHAR(255),
	@Logo_UrlPrincipal VARCHAR(255),
	@Logo_UrlSecundario VARCHAR(255),
	@NuevoID INT OUTPUT
AS
BEGIN	
    INSERT INTO Logo ( 
Logo_NombreBoton,
Logo_UrlIconBoton,
Logo_UrlPrincipal,
Logo_UrlSecundario)
    VALUES (@Logo_NombreBoton,@Logo_UrlIconBoton,@Logo_UrlPrincipal,@Logo_UrlSecundario);

        SET @NuevoID = SCOPE_IDENTITY(); 

END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Logo_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Listado de todos los registros de Logo
CREATE PROCEDURE [dbo].[USP_Logo_LIS]
AS
BEGIN
    SELECT 
	Logo_ID,
Logo_NombreBoton,
Logo_UrlIconBoton,
Logo_UrlPrincipal,
Logo_UrlSecundario

    FROM Logo
	WHERE Logo_Activo = 1;
	
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Logo_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Actualización de Logo
CREATE PROCEDURE [dbo].[USP_Logo_UPD]
@Logo_ID INT,
       @Logo_NombreBoton VARCHAR(50),
	@Logo_UrlIconBoton VARCHAR(255),
	@Logo_UrlPrincipal VARCHAR(255),
	@Logo_UrlSecundario VARCHAR(255)
AS
BEGIN
    UPDATE Logo
    SET 
        Logo_NombreBoton = @Logo_NombreBoton,
		Logo_UrlIconBoton =  @Logo_UrlIconBoton,
		Logo_UrlPrincipal = @Logo_UrlPrincipal,
		Logo_UrlSecundario =@Logo_UrlSecundario
    WHERE Logo_ID = @Logo_ID;
		   
	 SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Logro_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Listado de todos los registros de Logro
CREATE PROCEDURE [dbo].[USP_Logro_LIS]
AS
BEGIN
    SELECT 
	Logr_ID,
Logr_Nombre,
Logr_Descripcion,
Logr_UrlIcon

    FROM Logro
	WHERE Logr_Activo = 1;

END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Logro_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Actualización de Logro
CREATE PROCEDURE [dbo].[USP_Logro_UPD]
    @Logr_ID INT,
	@Logr_Nombre VARCHAR(50),
    @Logr_Descripcion VARCHAR(200),
	@Logr_UrlIcon VARCHAR(255)
AS
BEGIN
    UPDATE Logro
    SET 
        Logr_Nombre = @Logr_Nombre,
		Logr_Descripcion =  @Logr_Descripcion,
		Logr_UrlIcon = @Logr_UrlIcon
    WHERE Logr_ID = @Logr_ID;
		   
	 SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Menu_INS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Inserción en Menu
CREATE PROCEDURE [dbo].[USP_Menu_INS]     
    @Menu_Nombre VARCHAR(50),
	@Menu_UrlIconBoton VARCHAR(255),	
	@NuevoID INT OUTPUT
AS
BEGIN	
    INSERT INTO Menu ( 
Menu_Nombre,
Menu_UrlIconBoton
)
    VALUES (@Menu_Nombre,@Menu_UrlIconBoton);

        SET @NuevoID = SCOPE_IDENTITY(); 

END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Menu_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Listado de todos los registros de Menu
CREATE PROCEDURE [dbo].[USP_Menu_LIS]
AS
BEGIN
    SELECT 
	Menu_ID,
Menu_Nombre,
Menu_UrlIconBoton

    FROM Menu
	WHERE Menu_Activo = 1;
	
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Menu_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Actualización de Menu
CREATE PROCEDURE [dbo].[USP_Menu_UPD]
@Menu_ID INT,
       @Menu_Nombre VARCHAR(50),
	@Menu_UrlIconBoton VARCHAR(255)	
AS
BEGIN
    UPDATE Menu
    SET 
        Menu_Nombre = @Menu_Nombre,
		Menu_UrlIconBoton =  @Menu_UrlIconBoton
		
    WHERE Menu_ID = @Menu_ID;
		   
	 SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Multimedia_DEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_Multimedia_DEL]
    @Mult_ID INT
AS
BEGIN
    DELETE FROM Multimedia WHERE Mult_ID = @Mult_ID;
END;

GO
/****** Object:  StoredProcedure [dbo].[USP_Multimedia_INS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_Multimedia_INS]
    @Mult_URLImagen VARCHAR(255),
    @Mult_URLVideo VARCHAR(255),
    @Mult_URLIcon VARCHAR(255),
    @Mult_URLFile VARCHAR(255)
AS
BEGIN
    INSERT INTO Multimedia (Mult_URLImagen, Mult_URLVideo, Mult_URLIcon, Mult_URLFile)
    VALUES (@Mult_URLImagen, @Mult_URLVideo, @Mult_URLIcon, @Mult_URLFile);

    SELECT SCOPE_IDENTITY() AS NuevoID;
END;

GO
/****** Object:  StoredProcedure [dbo].[USP_Multimedia_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_Multimedia_LIS]
AS
BEGIN
    SELECT Mult_ID, Mult_URLImagen, Mult_URLVideo, Mult_URLIcon, Mult_URLFile
    FROM Multimedia;
END;

GO
/****** Object:  StoredProcedure [dbo].[USP_Multimedia_RPT]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_Multimedia_RPT]
AS
BEGIN
    SELECT Mult_ID, Mult_URLImagen, Mult_URLVideo, Mult_URLIcon, Mult_URLFile
    FROM Multimedia
    WHERE LEN(Mult_URLImagen) > 0; -- Condición específica para reporte
END;

GO
/****** Object:  StoredProcedure [dbo].[USP_Multimedia_SEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_Multimedia_SEL]
    @Mult_ID INT
AS
BEGIN
    SELECT Mult_ID, Mult_URLImagen, Mult_URLVideo, Mult_URLIcon, Mult_URLFile
    FROM Multimedia
    WHERE Mult_ID = @Mult_ID;
END;

GO
/****** Object:  StoredProcedure [dbo].[USP_Multimedia_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_Multimedia_UPD]
    @Mult_ID INT,
    @Mult_URLImagen VARCHAR(255),
    @Mult_URLVideo VARCHAR(255),
    @Mult_URLIcon VARCHAR(255),
    @Mult_URLFile VARCHAR(255)
AS
BEGIN
    UPDATE Multimedia
    SET Mult_URLImagen = @Mult_URLImagen,
        Mult_URLVideo = @Mult_URLVideo,
        Mult_URLIcon = @Mult_URLIcon,
        Mult_URLFile = @Mult_URLFile
    WHERE Mult_ID = @Mult_ID;
END;

GO
/****** Object:  StoredProcedure [dbo].[USP_Requisito_DEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_Requisito_DEL]
    @Requ_ID INT
AS
BEGIN
    UPDATE Requisito
	SET Requ_Activo = 0
	WHERE Requ_ID = @Requ_ID;
END;

GO
/****** Object:  StoredProcedure [dbo].[USP_Requisito_INS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para insertar un registro en la tabla Requisito
CREATE PROCEDURE [dbo].[USP_Requisito_INS]  
    @Requ_Orden INT,
    @Requ_Titulo VARCHAR(50) = NULL,
	@Requ_TituloSeccion VARCHAR(50) = NULL,
	@Requ_Nombre VARCHAR(50),
	@Requ_Descripcion VARCHAR(255),
	@Requ_URLIcon VARCHAR(255),
	@Requ_URLImagen VARCHAR(255) = NULL,
	@NuevoID INT OUTPUT
AS
BEGIN
DECLARE @Contador INT 
	SELECT  @Contador = count(*) from Requisito WHERE Requ_Activo = 1 and Requ_Orden <> 0
	SELECT @Contador
    INSERT INTO Requisito (Requ_Orden,
Requ_Titulo,
Requ_TituloSeccion,
Requ_Nombre,
Requ_Descripcion,
Requ_URLIcon,
Requ_URLImagen)
    VALUES (@Contador + 1,@Requ_Titulo,@Requ_TituloSeccion,@Requ_Nombre,@Requ_Descripcion,@Requ_URLIcon,@Requ_URLImagen);

	SET @NuevoID = SCOPE_IDENTITY(); 
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Requisito_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para listar todos los registros de la tabla Requisito
CREATE PROCEDURE [dbo].[USP_Requisito_LIS]
AS
BEGIN
    SELECT Requ_ID,Requ_Orden,Requ_Titulo,Requ_TituloSeccion,Requ_Nombre,Requ_Descripcion,Requ_URLIcon,Requ_URLImagen
    FROM Requisito
	WHERE Requ_Activo = 1
	ORDER BY Requ_Orden ASC;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Requisito_RPT]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento para reporte de registros en la tabla Requisito
CREATE PROCEDURE [dbo].[USP_Requisito_RPT]
AS
BEGIN
    SELECT r.Requ_ID, r.Mult_ID, m.Mult_URLImagen, r.Requ_Orden, r.Requ_Requisito
    FROM Requisito r
    INNER JOIN Multimedia m ON r.Mult_ID = m.Mult_ID
    ORDER BY r.Requ_Orden;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Requisito_SEL]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento para seleccionar un registro específico de la tabla Requisito
CREATE PROCEDURE [dbo].[USP_Requisito_SEL]
    @Requ_ID INT
AS
BEGIN
    SELECT Requ_ID, Mult_ID, Requ_Orden, Requ_Requisito
    FROM Requisito
    WHERE Requ_ID = @Requ_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Requisito_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para actualizar un registro en la tabla Requisito
CREATE PROCEDURE [dbo].[USP_Requisito_UPD]
    @Requ_ID INT,
    @Requ_Orden INT,
    @Requ_Titulo VARCHAR(50) = NULL,
	@Requ_TituloSeccion VARCHAR(50) = NULL,
	@Requ_Nombre VARCHAR(50) = NULL,
	@Requ_Descripcion VARCHAR(255) = NULL,
	@Requ_URLIcon VARCHAR(255) = NULL,
	@Requ_URLImagen VARCHAR(255) = NULL
AS
BEGIN
    UPDATE Requisito
    SET 
        Requ_Orden = @Requ_Orden,
        Requ_Titulo = @Requ_Titulo,
		Requ_TituloSeccion = @Requ_TituloSeccion,
		Requ_Nombre= @Requ_Nombre, 
		Requ_Descripcion = @Requ_Descripcion,
		Requ_URLIcon = @Requ_URLIcon,
		Requ_URLImagen = @Requ_URLImagen
    WHERE Requ_ID = @Requ_ID;

	 SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Testimonio_LIS]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Listado de todos los registros de Testimonio
CREATE PROCEDURE [dbo].[USP_Testimonio_LIS]
AS
BEGIN
    SELECT 
	Test_ID,
Test_Nombre,
Test_Descripcion,
Test_UrlIcon,
Test_UrlImagen
    FROM Testimonio
	WHERE Test_Activo = 1;

END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Testimonio_UPD]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Actualización de Testimonio
CREATE PROCEDURE [dbo].[USP_Testimonio_UPD]
    @Test_ID INT,
	@Test_Nombre VARCHAR(50),
    @Test_Descripcion VARCHAR(200),
	@Test_UrlImagen VARCHAR(255),
	@Test_UrlIcon VARCHAR(255)
AS
BEGIN
    UPDATE Testimonio
    SET 
        Test_Nombre = @Test_Nombre,
		Test_Descripcion =  @Test_Descripcion,
		Test_UrlIcon = @Test_UrlIcon,
			Test_UrlImagen = @Test_UrlImagen
    WHERE Test_ID = @Test_ID;
		   
	 SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_ValidarUsuario]    Script Date: 28/01/2025 18:48:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_ValidarUsuario] 
    @Usuario NVARCHAR(50)
  
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Usua_ID, Usua_Usuario,Usua_Contrasenia,Usua_Cargo
    FROM Usuario
    WHERE Usua_Usuario = @Usuario 
END;
GO
