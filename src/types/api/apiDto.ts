import type { Dto } from 'types/utils.ts';

export type LoginSolicitudDto = Omit<Dto<'LoginSolicitudDto'>, never>;
export type SesionRespuestaDto = Omit<Dto<'SesionRespuestaDto'>, never>;


export type ChoferDto = Omit<Dto<'ChoferResponseDto'>, never>;
export type ChoferCrearDto = Omit<Dto<'ChoferCreateDto'>, never>;
export type ChoferActualizarDto = Omit<Dto<'ChoferUpdateDto'>, never>;

export type AsignacionDto = Omit<Dto<'AsignacionRespuestaDto'>, never>;
export type AsignacionCrearDto = Omit<Dto<'AsignacionCrearDto'>, never>;
export type AsignacionActualizarDto = Omit<Dto<'AsignacionActualizarDto'>, never>;

export type ClienteDto = Omit<Dto<'ClienteRespuestaDto'>, never>;
export type ClienteCrearDto = Omit<Dto<'ClienteCreateDto'>, never>;
export type ClienteActualizarDto = Omit<Dto<'ClienteUpdateDto'>, never>;
export type ClienteDireccionDto = Omit<Dto<'ClienteDireccionRespuestaDto'>, never>;

export type DireccionDto = Omit<Dto<'DireccionDto'>, never>;

export type EstadoDto = Omit<Dto<'EstadoResponseDto'>, never>;

export type GuiaDto = Omit<Dto<'GuiaRespuestaDto'>, never>;
export type GuiaCrearDto = Omit<Dto<'GuiaCrearDto'>, never>;
export type GuiaActualizarDto = Omit<Dto<'GuiaActualizarDto'>, never>;
export type GuiaCreadaDto = Omit<Dto<'GuiaCreadaDto'>, never>;
export type GuiaFiltroDto = Omit<Dto<'GuiaFiltroDto'>, never>;
export type ArticulosGuiaDto = Omit<Dto<'ArticulosGuiaDto'>, never>;
export type ArticuloGuiaCrearDto = Omit<Dto<'ArticulosGuiaCrearDto'>, never>;

export type MunicipioDto = Omit<Dto<'MunicipioResponseDto'>, never>;

export type RolDto = Omit<Dto<'RolRespuestaDto'>, never>;
export type RolCreateDto = Omit<RolDto, 'rolId'>
export type RolUpdateDto = RolDto

export type RutaDto = Omit<Dto<'RutaRespuestaDto'>, never>;
export type RutaCrearDto = Omit<Dto<'RutaCrearDto'>, never>;
export type RutaActualizarDto = Omit<Dto<'RutaActualizarDto'>, never>;

export type SeguroDto = Omit<Dto<'SeguroResponseDto'>, never>;
export type SeguroActualizarDto = Omit<Dto<'SeguroUpdateDto'>, never>;
export type SeguroCrearDto = Omit<Dto<'SeguroCreateDto'>, never>;

export type SucursalDto = Omit<Dto<'SucursalResponseDto'>, never>;
export type SucursalCrearDto = Omit<Dto<'SucursalCreateDto'>, never>;
export type SucursalActualizarDto = Omit<Dto<'SucursaUpdateDto'>, never>;

export type UsuarioRespuestaDto = Omit<Dto<'UsuarioRespuestaDto'>, never>;
export type UsuarioCrearDto = Omit<Dto<'UsuarioCrearDto'>, never>;
export type UsuarioActualizarDto = Omit<Dto<'UsuarioActualizarDto'>, never>;