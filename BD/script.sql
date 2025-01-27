USE [TestPromPeru_Dev]
GO
/****** Object:  Table [dbo].[Auditoria]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  Table [dbo].[Banner]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  Table [dbo].[Beneficio]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Beneficio](
	[Bene_ID] [int] IDENTITY(1,1) NOT NULL,
	[Mult_ID] [int] NULL,
	[Bene_Beneficio] [varchar](50) NULL,
	[Bene_Descripcion] [varchar](200) NULL,
	[Bene_Orden] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Bene_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CasoExito]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CasoExito](
	[Cexi_ID] [int] IDENTITY(1,1) NOT NULL,
	[Mult_ID] [int] NULL,
	[Cexi_Casos] [varchar](50) NULL,
	[Cexi_Orden] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Cexi_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  Table [dbo].[Contacto]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  Table [dbo].[Curso]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Curso](
	[Curs_ID] [int] IDENTITY(1,1) NOT NULL,
	[Mult_ID] [int] NULL,
	[Preg_ID] [int] NULL,
	[Curs_NombreCurso] [varchar](50) NULL,
	[Curs_Descripcion] [varchar](200) NULL,
	[Curs_Objetivo] [varchar](200) NULL,
	[Curs_FechaInicio] [date] NULL,
	[Curs_FechaFin] [date] NULL,
	[Curs_DuracionHoras] [int] NULL,
	[Curs_Modalidad] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Curs_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EmpresaGraduada]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EmpresaGraduada](
	[Egra_ID] [int] IDENTITY(1,1) NOT NULL,
	[Mult_ID] [int] NULL,
	[Egra_NombreEmpresa] [varchar](50) NULL,
	[Egra_Orden] [int] NULL,
	[Egra_Descripcion] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[Egra_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Etapa]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  Table [dbo].[Evaluacion]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  Table [dbo].[Informacion]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Informacion](
	[Info_ID] [int] IDENTITY(1,1) NOT NULL,
	[Info_Titulo] [varchar](255) NULL,
	[Info_Descripcion] [varchar](max) NULL,
	[Info_URLPortada] [varchar](255) NULL,
	[Info_URLVideo] [varchar](255) NULL,
	[Info_Activo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Info_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inscripcion]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inscripcion](
	[Insc_ID] [int] IDENTITY(1,1) NOT NULL,
	[Etap_ID] [int] NULL,
	[Mult_ID] [int] NULL,
	[Insc_Titulo] [varchar](50) NULL,
	[Insc_Contenido] [varchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[Insc_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Multimedia]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  Table [dbo].[Pregunta]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  Table [dbo].[Programa]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  Table [dbo].[Requisito]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Requisito](
	[Requ_ID] [int] IDENTITY(1,1) NOT NULL,
	[Requ_Orden] [int] NULL,
	[Requ_Titulo] [varchar](50) NULL,
	[Requ_Descripcion] [varchar](255) NULL,
	[Requ_URLIcon] [varchar](255) NULL,
	[Requ_URLImagen] [varchar](255) NULL,
	[Requ_Activo] [bit] NOT NULL,
	[Requ_Nombre] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Requ_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Respuesta]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  Table [dbo].[Usuario]    Script Date: 14/01/2025 14:50:35 ******/
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
SET IDENTITY_INSERT [dbo].[Auditoria] OFF
GO
SET IDENTITY_INSERT [dbo].[Banner] ON 

INSERT [dbo].[Banner] ([Bann_ID], [Bann_Orden], [Bann_Nombre], [Bann_URLImagen], [Bann_Activo]) VALUES (22, 1, N'Un texto argumentativo es un texto que tiene como objetivo convencer al lector de una postura o opinión sobre un tema determinado. Para ello, el autor aporta razones y argumentos que sustentan (1)', N'https://www.google.com/search?q=texto+argumentativo&rlz=1', 1)
INSERT [dbo].[Banner] ([Bann_ID], [Bann_Orden], [Bann_Nombre], [Bann_URLImagen], [Bann_Activo]) VALUES (23, 3, N'Un texto argumentativo es un texto que tiene como objetivo convencer al lector de una postura o opinión sobre un tema determinado. Para ello, el autor aporta razones y argumentos que sustentan (2) ', N'https://www.google.com/search?q=texto+argumentativo&rlz=2', 1)
INSERT [dbo].[Banner] ([Bann_ID], [Bann_Orden], [Bann_Nombre], [Bann_URLImagen], [Bann_Activo]) VALUES (24, 3, N'12312', N'123123', 0)
INSERT [dbo].[Banner] ([Bann_ID], [Bann_Orden], [Bann_Nombre], [Bann_URLImagen], [Bann_Activo]) VALUES (25, 4, N'12', N'123', 0)
INSERT [dbo].[Banner] ([Bann_ID], [Bann_Orden], [Bann_Nombre], [Bann_URLImagen], [Bann_Activo]) VALUES (26, 2, N'1', N'1', 1)
SET IDENTITY_INSERT [dbo].[Banner] OFF
GO
SET IDENTITY_INSERT [dbo].[Informacion] ON 

INSERT [dbo].[Informacion] ([Info_ID], [Info_Titulo], [Info_Descripcion], [Info_URLPortada], [Info_URLVideo], [Info_Activo]) VALUES (1, N'Nuevo Título', N'Nueva Descripción', N'http://nuevaurl.com/portada', N'http://nuevaurl.com/video', 1)
INSERT [dbo].[Informacion] ([Info_ID], [Info_Titulo], [Info_Descripcion], [Info_URLPortada], [Info_URLVideo], [Info_Activo]) VALUES (2, N'123123123123', N'12312', N'1', N'1', 0)
SET IDENTITY_INSERT [dbo].[Informacion] OFF
GO
SET IDENTITY_INSERT [dbo].[Requisito] ON 

INSERT [dbo].[Requisito] ([Requ_ID], [Requ_Orden], [Requ_Titulo], [Requ_Descripcion], [Requ_URLIcon], [Requ_URLImagen], [Requ_Activo], [Requ_Nombre]) VALUES (1, 0, N'Nuestros Requisitos1', NULL, NULL, NULL, 1, NULL)
INSERT [dbo].[Requisito] ([Requ_ID], [Requ_Orden], [Requ_Titulo], [Requ_Descripcion], [Requ_URLIcon], [Requ_URLImagen], [Requ_Activo], [Requ_Nombre]) VALUES (2, 2, NULL, N'.0.0', N'https://localhost:7093/Requisito', NULL, 1, NULL)
INSERT [dbo].[Requisito] ([Requ_ID], [Requ_Orden], [Requ_Titulo], [Requ_Descripcion], [Requ_URLIcon], [Requ_URLImagen], [Requ_Activo], [Requ_Nombre]) VALUES (3, 2, NULL, N'12333333333333333333', N'333333333333', NULL, 0, N'12312312')
INSERT [dbo].[Requisito] ([Requ_ID], [Requ_Orden], [Requ_Titulo], [Requ_Descripcion], [Requ_URLIcon], [Requ_URLImagen], [Requ_Activo], [Requ_Nombre]) VALUES (4, 1, NULL, N'2', N'333', NULL, 1, NULL)
INSERT [dbo].[Requisito] ([Requ_ID], [Requ_Orden], [Requ_Titulo], [Requ_Descripcion], [Requ_URLIcon], [Requ_URLImagen], [Requ_Activo], [Requ_Nombre]) VALUES (5, 3, NULL, N'qweqwe', N'qweqwe', NULL, 1, NULL)
SET IDENTITY_INSERT [dbo].[Requisito] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Usua_ID], [Usua_Usuario], [Usua_Contrasenia], [Usua_Cargo]) VALUES (1, N'Super_Admin', N'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', N'Super Administrador')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[Banner] ADD  DEFAULT ((1)) FOR [Bann_Activo]
GO
ALTER TABLE [dbo].[Informacion] ADD  DEFAULT ((1)) FOR [Info_Activo]
GO
ALTER TABLE [dbo].[Requisito] ADD  DEFAULT ((1)) FOR [Requ_Activo]
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
ALTER TABLE [dbo].[Beneficio]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
GO
ALTER TABLE [dbo].[Beneficio]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
GO
ALTER TABLE [dbo].[CasoExito]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
GO
ALTER TABLE [dbo].[CasoExito]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
GO
ALTER TABLE [dbo].[Curso]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
GO
ALTER TABLE [dbo].[Curso]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
GO
ALTER TABLE [dbo].[EmpresaGraduada]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
GO
ALTER TABLE [dbo].[EmpresaGraduada]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
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
ALTER TABLE [dbo].[Inscripcion]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
GO
ALTER TABLE [dbo].[Inscripcion]  WITH CHECK ADD FOREIGN KEY([Mult_ID])
REFERENCES [dbo].[Multimedia] ([Mult_ID])
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
/****** Object:  StoredProcedure [dbo].[USP_Auditoria_INS]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Banner_DEL]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Banner_INS]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Banner_LIS]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Banner_RPT]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Banner_SEL]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Banner_UPD]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Beneficio_DEL]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Eliminación de Beneficio
CREATE PROCEDURE [dbo].[USP_Beneficio_DEL]
    @Bene_ID INT
AS
BEGIN
    DELETE FROM Beneficio WHERE Bene_ID = @Bene_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_CasoExito_DEL]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_CasoExito_DEL]
    @Cexi_ID INT
AS
BEGIN
    DELETE FROM CasoExito WHERE Cexi_ID = @Cexi_ID
END
GO
/****** Object:  StoredProcedure [dbo].[USP_CasoExito_INS]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_CasoExito_INS]
    @Mult_ID INT,
    @Cexi_Casos VARCHAR(50),
    @Cexi_Orden INT
AS
BEGIN
    INSERT INTO CasoExito (Mult_ID, Cexi_Casos, Cexi_Orden)
    VALUES (@Mult_ID, @Cexi_Casos, @Cexi_Orden)
END
GO
/****** Object:  StoredProcedure [dbo].[USP_CasoExito_LIS]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_CasoExito_LIS]
AS
BEGIN
    SELECT * FROM CasoExito
END
GO
/****** Object:  StoredProcedure [dbo].[USP_CasoExito_RPT]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_CasoExito_SEL]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_CasoExito_UPD]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_CasoExito_UPD]
    @Cexi_ID INT,
    @Mult_ID INT,
    @Cexi_Casos VARCHAR(50),
    @Cexi_Orden INT
AS
BEGIN
    UPDATE CasoExito
    SET 
        Mult_ID = @Mult_ID,
        Cexi_Casos = @Cexi_Casos,
        Cexi_Orden = @Cexi_Orden
    WHERE Cexi_ID = @Cexi_ID
END
GO
/****** Object:  StoredProcedure [dbo].[USP_Informacion_DEL]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Informacion_INS]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para insertar un registro en la tabla Informacion
CREATE PROCEDURE [dbo].[USP_Informacion_INS] 
    @Info_Titulo VARCHAR(255),
    @Info_Descripcion VARCHAR(MAX),
	@Info_URLPortada  VARCHAR(255),
	@Info_URLVideo  VARCHAR(255),
	@NuevoID INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Informacion (Info_Titulo, Info_Descripcion,Info_URLPortada,Info_URLVideo)
    VALUES (@Info_Titulo, @Info_Descripcion,@Info_URLPortada,@Info_URLVideo);

    SET @NuevoID = SCOPE_IDENTITY(); 
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Informacion_LIS]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para listar todos los registros de la tabla Informacion
CREATE PROCEDURE [dbo].[USP_Informacion_LIS]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Info_ID,Info_Titulo, Info_Descripcion,Info_URLPortada,Info_URLVideo
    FROM Informacion
	WHERE Info_Activo=1;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Informacion_RPT]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Informacion_SEL]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Informacion_UPD]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para actualizar un registro de la tabla Informacion
CREATE PROCEDURE [dbo].[USP_Informacion_UPD]
    @Info_ID INT,
    @Info_Titulo VARCHAR(255),
    @Info_Descripcion VARCHAR(500),
	@Info_URLPortada VARCHAR(255),
	@Info_URLVideo VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Informacion
    SET 
        Info_Titulo = @Info_Titulo,
        Info_Descripcion = @Info_Descripcion,
		 Info_URLPortada = @Info_URLPortada,
        Info_URLVideo = @Info_URLVideo
    WHERE Info_ID = @Info_ID;

	   SELECT @@ROWCOUNT AS FilasAfectadas;

	SET NOCOUNT OFF;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Inscripcion_DEL]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento para eliminar un registro en la tabla Inscripcion
CREATE PROCEDURE [dbo].[USP_Inscripcion_DEL]
    @Insc_ID INT
AS
BEGIN
    DELETE FROM Inscripcion
    WHERE Insc_ID = @Insc_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Inscripcion_INS]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para insertar un registro en la tabla Inscripcion
CREATE PROCEDURE [dbo].[USP_Inscripcion_INS]
    @Etap_ID INT,
    @Mult_ID INT,
    @Insc_Titulo VARCHAR(50),
    @Insc_Contenido VARCHAR(200)
AS
BEGIN
    INSERT INTO Inscripcion (Etap_ID, Mult_ID, Insc_Titulo, Insc_Contenido)
    VALUES (@Etap_ID, @Mult_ID, @Insc_Titulo, @Insc_Contenido);
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Inscripcion_LIS]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento para listar los registros en la tabla Inscripcion
CREATE PROCEDURE [dbo].[USP_Inscripcion_LIS]
AS
BEGIN
    SELECT Insc_ID, Etap_ID, Mult_ID, Insc_Titulo, Insc_Contenido
    FROM Inscripcion;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Inscripcion_RPT]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Inscripcion_SEL]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Inscripcion_UPD]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento para actualizar un registro en la tabla Inscripcion
CREATE PROCEDURE [dbo].[USP_Inscripcion_UPD]
    @Insc_ID INT,
    @Etap_ID INT,
    @Mult_ID INT,
    @Insc_Titulo VARCHAR(50),
    @Insc_Contenido VARCHAR(200)
AS
BEGIN
    UPDATE Inscripcion
    SET Etap_ID = @Etap_ID,
        Mult_ID = @Mult_ID,
        Insc_Titulo = @Insc_Titulo,
        Insc_Contenido = @Insc_Contenido
    WHERE Insc_ID = @Insc_ID;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Multimedia_DEL]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Multimedia_INS]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Multimedia_LIS]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Multimedia_RPT]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Multimedia_SEL]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Multimedia_UPD]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Requisito_DEL]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Requisito_INS]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para insertar un registro en la tabla Requisito
CREATE PROCEDURE [dbo].[USP_Requisito_INS]  
    @Requ_Orden INT,
    @Requ_Titulo VARCHAR(50) = NULL,
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
Requ_Nombre,
Requ_Descripcion,
Requ_URLIcon,
Requ_URLImagen)
    VALUES (@Contador + 1,@Requ_Titulo,@Requ_Nombre,@Requ_Descripcion,@Requ_URLIcon,@Requ_URLImagen);

	SET @NuevoID = SCOPE_IDENTITY(); 
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Requisito_LIS]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para listar todos los registros de la tabla Requisito
CREATE PROCEDURE [dbo].[USP_Requisito_LIS]
AS
BEGIN
    SELECT Requ_ID,Requ_Orden,Requ_Titulo,Requ_Nombre,Requ_Descripcion,Requ_URLIcon,Requ_URLImagen
    FROM Requisito
	WHERE Requ_Activo = 1
	ORDER BY Requ_Orden ASC;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_Requisito_RPT]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Requisito_SEL]    Script Date: 14/01/2025 14:50:35 ******/
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
/****** Object:  StoredProcedure [dbo].[USP_Requisito_UPD]    Script Date: 14/01/2025 14:50:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento para actualizar un registro en la tabla Requisito
CREATE PROCEDURE [dbo].[USP_Requisito_UPD]
    @Requ_ID INT,
    @Requ_Orden INT,
    @Requ_Titulo VARCHAR(50) = NULL,
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
		Requ_Nombre= @Requ_Nombre, 
		Requ_Descripcion = @Requ_Descripcion,
		Requ_URLIcon = @Requ_URLIcon,
		Requ_URLImagen = @Requ_URLImagen
    WHERE Requ_ID = @Requ_ID;

	 SELECT @@ROWCOUNT AS FilasAfectadas;
END;
GO
/****** Object:  StoredProcedure [dbo].[USP_ValidarUsuario]    Script Date: 14/01/2025 14:50:35 ******/
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
